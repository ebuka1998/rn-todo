import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import CreateListModal from '../components/detailComponents/CreateListModal';
import {colorList} from '../utils/colorList';
import {Task, List} from '../models';
import {DataStore} from 'aws-amplify';
import {useSelector, useDispatch} from 'react-redux';
import BottomSheetInput from '../components/detailComponents/BottomSheetInput';
import {FAB} from '@rneui/themed';
import {useRef} from 'react';
import TaskTile from '../components/detailComponents/TaskTile';
import Background from '../components/detailComponents/Background';
import Loading from '../components/homeComponent/Loading';
import CompletedTile from '../components/detailComponents/CompletedTile';
import moment from 'moment/moment';
import {
  deleteTask,
  getCompletedTasks,
  getTasks,
  updateIsCompleted,
  updateIsImportant,
} from '../utils/functions/taskFunction';
import {ADD_TASK_INFRONT} from '../redux/features/taskSlice';
import DatePicker from 'react-native-date-picker';
import notifee, {TriggerType} from '@notifee/react-native';
import {Button} from 'react-native';

const ListDetailScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(store => store.user);
  const {tasks, completedTasks, isLoadingTasks} = useSelector(
    store => store.task,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [checked, setChecked] = useState(0);
  const [listColor, setListColor] = useState('');
  const [listName, setListName] = useState('');
  const [taskValue, setTaskValue] = useState('');
  const [isFabVisible, setIsFabVisible] = useState(true);
  const {isCreating, listTitle, listId, color} = route.params;
  const refRBSheet = useRef();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isCreating) {
      setIsVisible(true);
      setListColor(colorList[0].color);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: listTitle,
      headerTintColor: color ? color : listColor,
    });
  }, [listTitle, navigation, listColor]);

  useEffect(() => {
    if (!isCreating) {
      dispatch(getTasks(listId));
      dispatch(getCompletedTasks(listId));
    }
  }, [isCreating, listId]);

  const changeColor = (i, color) => {
    setChecked(i);
    setListColor(color);
  };

  const createAlist = async () => {
    const list = await DataStore.save(
      new List({
        listName,
        listColor,
        owner: user.user.email,
        ownerId: user.user.id,
      }),
    );
    navigation.setParams({
      listTitle: listName,
      isCreating: false,
      listId: list.id,
    });
    setIsVisible(false);
  };

  const createTask = async () => {
    try {
      const task = await DataStore.save(
        new Task({
          taskTitle: taskValue,
          owner: user.user.email,
          ownerId: user.user.id,
          isCompleted: false,
          isImportant: false,
          listID: listId,
          createdOn: moment(new Date()).toISOString().substring(0, 10),
        }),
      );
      setTaskValue('');
      const t = {
        id: task.id,
        taskTitle: task.taskTitle,
        owner: task.owner,
        ownerId: task.ownerId,
        isCompleted: task.isCompleted,
        isImportant: task.isImportant,
        listID: task.listID,
        createdOn: task.createdOn,
        updatedOn: task.updatedOn,
      };
      dispatch(ADD_TASK_INFRONT(t));
    } catch (error) {
      console.log(error);
    }
  };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId,
        },
      },
      trigger,
    );
  }

  return (
    <View style={styles.container}>
      {isCreating && <Background />}

      {isLoadingTasks ? (
        <Loading color={color} />
      ) : (
        <FlatList
          data={
            completedTasks.length > 0 ? [...tasks, {completedTasks}] : tasks
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            if (item.completedTasks?.length > 0) {
              return (
                <View style={{marginTop: 10}}>
                  <CompletedTile
                    key={item}
                    completedTasks={completedTasks}
                    selectedColor={color ? color : listColor}
                    setCompleted={(id, isCompleted) =>
                      dispatch(updateIsCompleted(id, isCompleted))
                    }
                    deleteTask={id => dispatch(deleteTask(id))}
                    markAsImportant={(id, isImportant) =>
                      dispatch(updateIsImportant(id, isImportant))
                    }
                  />
                </View>
              );
            }
            return (
              <TaskTile
                key={item}
                selectedColor={color ? color : listColor}
                title={item.taskTitle}
                isCompleted={item.isCompleted}
                isImportant={item.isImportant}
                height={70}
                markAsImportant={() =>
                  dispatch(updateIsImportant(item.id, item.isImportant))
                }
                setCompleted={() =>
                  dispatch(updateIsCompleted(item.id, item.isCompleted))
                }
                deleteTask={() => dispatch(deleteTask(item.id))}
              />
            );
          }}
          key={'#'}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => <Background />}
          style={{marginBottom: 10, marginTop: 5}}
        />
      )}
      {/* <Text>{date.getHours().toString()}</Text>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      /> */}
      <CreateListModal
        isVisible={isVisible}
        closeModal={() => {
          setIsVisible(false);
          navigation.goBack();
        }}
        colorList={colorList}
        changeColor={changeColor}
        isChecked={checked}
        selectedColor={listColor}
        listValue={listName}
        onChangeValue={list => setListName(list)}
        createList={createAlist}
        textMaxValue={25}
      />
      <FAB
        visible={isFabVisible}
        onPress={() => {
          refRBSheet.current.open();
          setIsFabVisible(!isFabVisible);
        }}
        placement="right"
        size="large"
        icon={{name: 'add', color: 'white'}}
        color={color ? color : listColor}
      />
      {/* <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
      <BottomSheetInput
        refRBSheet={refRBSheet}
        showFab={() => setIsFabVisible(true)}
        selectedColor={color ? color : listColor}
        taskValue={taskValue}
        createTask={createTask}
        changeTaskValue={task => setTaskValue(task)}
        openDateTime={() => setOpen(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ListDetailScreen;
