import {Task} from '../../models';
import {DataStore, SortDirection} from 'aws-amplify';
import {
  SET_COMPLETED_TASK,
  SET_TASK,
  UPDATE_COMPLETED_TASK,
  SET_IMPORTANT_TASK,
  UPDATE_ISIMPORTANT_TASK,
  DELETE_TASK,
  SET_LOADING_TASKS,
} from '../../redux/features/taskSlice';

export const getTasks = listId => async dispatch => {
  try {
    dispatch(SET_LOADING_TASKS());
    const tasksData = await DataStore.query(
      Task,
      t => t.listID('eq', listId).isCompleted('eq', false),
      {
        sort: t => t.createdOn(SortDirection.DESCENDING),
      },
    );
    const realTasks = tasksData.map(task => {
      return {
        createdOn: task.createdOn,
        id: task.id,
        isCompleted: task.isCompleted,
        isImportant: task.isImportant,
        owner: task.owner,
        ownerId: task.ownerId,
        taskTitle: task.taskTitle,
        updatedOn: task.updatedOn,
      };
    });
    dispatch(SET_TASK(realTasks));
    dispatch(SET_LOADING_TASKS());
  } catch (error) {
    console.log(error);
  }
};

export const getCompletedTasks = listId => async dispatch => {
  try {
    const tasksData = await DataStore.query(
      Task,
      t => t.listID('eq', listId).isCompleted('eq', true),
      {
        sort: t => t.createdOn(SortDirection.DESCENDING),
      },
    );
    const realTasks = tasksData.map(task => {
      return {
        createdOn: task.createdOn,
        id: task.id,
        isCompleted: task.isCompleted,
        isImportant: task.isImportant,
        owner: task.owner,
        ownerId: task.ownerId,
        taskTitle: task.taskTitle,
        updatedOn: task.updatedOn,
      };
    });
    dispatch(SET_COMPLETED_TASK(realTasks));
  } catch (error) {
    console.log(error);
  }
};
export const getImportantTasks = user => async dispatch => {
  dispatch(SET_LOADING_TASKS());
  try {
    const tasksData = await DataStore.query(
      Task,
      t => t.isImportant('eq', true).owner('eq', user),
      {
        sort: t => t.createdOn(SortDirection.DESCENDING),
      },
    );
    const importantTasks = tasksData.map(task => {
      return {
        createdOn: task.createdOn,
        id: task.id,
        isCompleted: task.isCompleted,
        isImportant: task.isImportant,
        owner: task.owner,
        ownerId: task.ownerId,
        taskTitle: task.taskTitle,
        updatedOn: task.updatedOn,
      };
    });
    dispatch(SET_IMPORTANT_TASK(importantTasks));
    dispatch(SET_LOADING_TASKS());
  } catch (error) {
    console.log(error);
  }
};

export const updateIsCompleted =
  (id, isCompleted) => async (dispatch, state) => {
    dispatch(UPDATE_COMPLETED_TASK(id));

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

export const updateIsImportant = (id, isImportant) => async dispatch => {
  dispatch(UPDATE_ISIMPORTANT_TASK(id));
  try {
    const original = await DataStore.query(Task, id);
    await DataStore.save(
      Task.copyOf(original, updated => {
        updated.isImportant = !isImportant;
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = id => async dispatch => {
  try {
    const todelete = await DataStore.query(Task, id);
    DataStore.delete(todelete);
    dispatch(DELETE_TASK(id));
  } catch (error) {
    console.log(error);
  }
};
