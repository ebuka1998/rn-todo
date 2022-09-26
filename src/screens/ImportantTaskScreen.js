import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Task} from '../models';
import {DataStore} from 'aws-amplify';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment/moment';
import {FAB} from '@rneui/themed';
import BottomSheetInput from '../components/detailComponents/BottomSheetInput';
import {useRef} from 'react';
import TaskTile from '../components/detailComponents/TaskTile';
import {getImportantTasks} from '../utils/functions/taskFunction';
import {
  ADD_TO_IMPORTANT,
  DELETE_IS_IMPORTANT,
  UPDATE_ISIMPORTANT_COMPLETED,
} from '../redux/features/taskSlice';
import EmptyImage from '../components/homeComponent/EmptyImage';

const ImportantTaskScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(store => store.user);
  const {importantTasks} = useSelector(store => store.task);
  const [isFabVisible, setIsFabVisible] = useState(true);
  const [taskValue, setTaskValue] = useState('');
  const refRBSheet = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: '#DC143C',
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getImportantTasks(user.user.email));
  }, []);

  const createTask = async () => {
    try {
      const task = await DataStore.save(
        new Task({
          taskTitle: taskValue,
          owner: user.user.email,
          ownerId: user.user.id,
          isCompleted: false,
          isImportant: true,
          createdOn: moment(new Date()).toISOString().substring(0, 10),
        }),
      );
      console.log(task);
      setTaskValue('');
      const t = {
        id: task.id,
        taskTitle: task.taskTitle,
        owner: task.owner,
        ownerId: task.ownerId,
        isCompleted: task.isCompleted,
        isImportant: task.isImportant,
        createdOn: task.createdOn,
        updatedOn: task.updatedOn,
      };
      dispatch(ADD_TO_IMPORTANT(t));
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsCompleted = async (id, isCompleted) => {
    dispatch(UPDATE_ISIMPORTANT_COMPLETED(id));
    try {
      const original = await DataStore.query(Task, id);
      await DataStore.save(
        Task.copyOf(original, updated => {
          updated.isCompleted = !isCompleted;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async idToDelete => {
    dispatch(DELETE_IS_IMPORTANT(idToDelete));
    try {
      const todelete = await DataStore.query(Task, idToDelete);
      DataStore.delete(todelete);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={importantTasks}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TaskTile
              selectedColor={'#DC143C'}
              title={item.taskTitle}
              isCompleted={item.isCompleted}
              isImportant={item.isImportant}
              height={70}
              setCompleted={() => updateIsCompleted(item.id, item.isCompleted)}
              deleteTask={() => deleteTask(item.id)}
            />
          );
        }}
        key={'#'}
        keyExtractor={item => item.id}
        style={{marginBottom: 10, marginTop: 5}}
        ListEmptyComponent={() => (
          <EmptyImage
            image={require('../images/important.png')}
            firstText="Important tasks go in here"
            secondText="Try starring some task or creating one!"
            color="#DC143C"
          />
        )}
      />
      <FAB
        visible={isFabVisible}
        onPress={() => {
          refRBSheet.current.open();
          //   setIsFabVisible(!isFabVisible);
        }}
        placement="right"
        size="large"
        icon={{name: 'add', color: 'white'}}
        color={'#DC143C'}
      />
      <BottomSheetInput
        refRBSheet={refRBSheet}
        showFab={() => setIsFabVisible(true)}
        selectedColor={'#DC143C'}
        taskValue={taskValue}
        createTask={createTask}
        changeTaskValue={task => setTaskValue(task)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ImportantTaskScreen;
