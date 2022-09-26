import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import listReducer, {SET_LIST} from './features/listSlice';
import taskReducer from './features/taskSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    list: listReducer,
    task: taskReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [SET_LIST],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // // Ignore these paths in the state
        // ignoredPaths: ['items.dates'],
      },
    }),
});
