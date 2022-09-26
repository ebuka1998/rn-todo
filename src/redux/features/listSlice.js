import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  isLoadingLists: false,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    SET_LIST: (state, action) => {
      state.lists = action.payload;
    },
    ADD_TO_LIST: (state, action) => {
      state.lists = [...state.lists, action.payload];
    },
    IN_FRONT: (state, action) => {
      state.lists = [action.payload, ...state.lists];
    },
    SET_LOADING_LIST: (state, action) => {
      state.isLoadingLists = !state.isLoadingLists;
    },
  },
});

export const {SET_LIST, SET_LOADING_LIST, ADD_TO_LIST, IN_FRONT} =
  listSlice.actions;

export default listSlice.reducer;
