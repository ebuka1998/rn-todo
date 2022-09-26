import {View, Text, ImageBackground} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment/moment';
import {FAB} from '@rneui/themed';
import BottomSheetInput from '../components/detailComponents/BottomSheetInput';
import {DataStore} from 'aws-amplify';
import {MyDay} from '../models';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import TaskTile from '../components/detailComponents/TaskTile';

const TodayTaskScreen = ({navigation}) => {
  const refRBSheet = useRef();
  const [isFabVisible, setIsFabVisible] = useState(true);
  const [taskValue, setTaskValue] = useState('');
  const [myTasks, setMyTasks] = useState([]);
  const {user} = useSelector(store => store.user);
  //   const today = new Date();
  useEffect(() => {
    navigation.setOptions({
      headerTintColor: '#0096FF',
      headerTitle: () => (
        <View>
          <Text style={{fontSize: 18, color: '#0096FF'}}>My Day</Text>
          <Text style={{color: '#0096FF'}}>
            {moment(new Date()).format('dddd, Do MMMM')}
          </Text>
        </View>
      ),
    });
    // const l = new Date();
    // console.log(moment(new Date()).format('dddd, Do MMMM'));
    // console.log(moment(new Date()).toISOString('MMMM, Do YYYY'));
    // console.log(moment(new Date()).toISOString().substring(0, 10));
  }, [navigation]);

  useEffect(() => {
    const subscription = DataStore.observe(MyDay, t =>
      t
        .createdOn('eq', moment(new Date()).toISOString().substring(0, 10))
        .owner('eq', user.user.email),
    ).subscribe(snapshot => {
      const {items} = snapshot;
      setMyTasks(items);
    });

    return function cleanup() {
      subscription.unsubscribe();
    };
  });

  const createTask = async () => {
    try {
      const task = await DataStore.save(
        new MyDay({
          owner: user.user.email,
          ownerId: user.user.id,
          myDayTitle: taskValue,
          isCompleted: false,
          isImportant: false,
          createdOn: moment(new Date()).toISOString().substring(0, 10),
        }),
      );
      console.log(task);
      setTaskValue('');
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsCompleted = async (id, isCompleted) => {
    try {
      const original = await DataStore.query(MyDay, id);
      await DataStore.save(
        Task.copyOf(original, updated => {
          updated.isCompleted = !isCompleted;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsImportant = async (id, isImportant) => {
    try {
      const original = await DataStore.query(MyDay, id);
      await DataStore.save(
        Task.copyOf(original, updated => {
          updated.isImportant = !isImportant;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async idToDelete => {
    try {
      const todelete = await DataStore.query(MyDay, idToDelete);
      DataStore.delete(todelete);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      {myTasks.length > 0 && (
        <FlatList
          data={myTasks}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TaskTile
                selectedColor={'#0096FF'}
                title={item.myDayTitle}
                isCompleted={item.isCompleted}
                height={70}
                markAsImportant={() =>
                  updateIsImportant(item.id, item.isImportant)
                }
                setCompleted={() =>
                  updateIsCompleted(item.id, item.isCompleted)
                }
                deleteTask={() => deleteTask(item.id)}
              />
            );
          }}
          key={'#'}
          keyExtractor={item => item.id}
          //   ListEmptyComponent={() =>
          //     myTasksCompleted?.length > 0 ? null : <Background />
          //   }
          //   ListFooterComponent={() => (
          //     <View style={{marginTop: 10}}>
          //       {myTasksCompleted?.length > 0 && (
          //         <CompletedTile
          //           completedTasks={myTasksCompleted}
          //           selectedColor={color}
          //           setCompleted={updateIsCompleted}
          //           deleteTask={deleteTask}
          //           markAsImportant={updateIsImportant}
          //         />
          //       )}
          //     </View>
          //   )}
          style={{marginBottom: 10, marginTop: 5}}
        />
      )}
      <FAB
        visible={isFabVisible}
        onPress={() => {
          refRBSheet.current.open();
          //   setIsFabVisible(!isFabVisible);
        }}
        placement="right"
        size="large"
        icon={{name: 'add', color: 'white'}}
        color={'#0096FF'}
      />
      <BottomSheetInput
        refRBSheet={refRBSheet}
        showFab={() => setIsFabVisible(true)}
        selectedColor={'#0096FF'}
        taskValue={taskValue}
        createTask={createTask}
        changeTaskValue={task => setTaskValue(task)}
      />
    </View>
  );
};

export default TodayTaskScreen;
