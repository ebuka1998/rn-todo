import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  completedTasks: [],
  importantTasks: [],
  isLoadingTasks: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    SET_TASK: (state, action) => {
      state.tasks = action.payload;
    },
    SET_COMPLETED_TASK: (state, action) => {
      state.completedTasks = action.payload;
    },
    SET_IMPORTANT_TASK: (state, action) => {
      state.importantTasks = action.payload;
    },
    UPDATE_COMPLETED_TASK: (state, action) => {
      const taskId = action.payload;
      let completedTask = state.tasks.find(item => item.id === taskId);
      let ct = state.completedTasks.find(item => item.id === taskId);
      if (ct === undefined) {
        completedTask.isCompleted = !completedTask.isCompleted;
        state.tasks = state.tasks.filter(task => task.id !== taskId);
        state.completedTasks = [...state.completedTasks, completedTask];
      } else {
        ct.isCompleted = !ct.isCompleted;
        state.completedTasks = state.completedTasks.filter(
          task => task.id !== taskId,
        );
        state.tasks = [...state.tasks, ct];
      }
    },
    UPDATE_ISIMPORTANT_TASK: (state, action) => {
      const taskId = action.payload;
      let importantTask = state.tasks.find(item => item.id === taskId);
      let it = state.completedTasks.find(item => item.id === taskId);
      if (it === undefined) {
        importantTask.isImportant = !importantTask.isImportant;
      } else {
        it.isImportant = !it.isImportant;
      }
    },
    DELETE_TASK: (state, action) => {
      const taskId = action.payload;
      let completedTaskToDelete = state.completedTasks.find(
        item => item.id === taskId,
      );
      if (completedTaskToDelete === undefined) {
        state.tasks = state.tasks.filter(task => task.id !== taskId);
      } else {
        state.completedTasks = state.completedTasks.filter(
          task => task.id !== taskId,
        );
      }
    },

    UPDATE_ISIMPORTANT_COMPLETED: (state, action) => {
      const taskId = action.payload;
      let task = state.importantTasks.find(item => item.id === taskId);
      task.isCompleted = !task.isCompleted;
    },

    UPDATE_ISIMPORTANT_IMPORTANT: (state, action) => {
      const taskId = action.payload;
      let task = state.importantTasks.find(item => item.id === taskId);
      task.isImportant = !task.isImportant;
      state.importantTasks = state.importantTasks.filter(
        task => task.id !== taskId,
      );
    },

    DELETE_IS_IMPORTANT: (state, action) => {
      const taskId = action.payload;
      state.importantTasks = state.importantTasks.filter(
        task => task.id !== taskId,
      );
    },

    ADD_TASK_INFRONT: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    ADD_TASK_BEHIND: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    ADD_TO_IMPORTANT: (state, action) => {
      state.importantTasks = [...state.importantTasks, action.payload];
    },
    SET_LOADING_TASKS: (state, action) => {
      state.isLoadingTasks = !state.isLoadingTasks;
    },
  },
});

export const {
  SET_TASK,
  ADD_TASK_INFRONT,
  ADD_TASK_BEHIND,
  ADD_TO_IMPORTANT,
  SET_COMPLETED_TASK,
  UPDATE_COMPLETED_TASK,
  SET_IMPORTANT_TASK,
  SET_LOADING_TASKS,
  UPDATE_ISIMPORTANT_TASK,
  DELETE_TASK,
  UPDATE_ISIMPORTANT_COMPLETED,
  UPDATE_ISIMPORTANT_IMPORTANT,
  DELETE_IS_IMPORTANT,
} = taskSlice.actions;

export default taskSlice.reducer;
