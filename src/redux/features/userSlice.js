import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const initialState = {
  user: null,
  userLoading: false,
  isSignedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      // console.log(action.payload);
      state.user = action.payload;
    },
    SET_IS_SIGNED_IN: (state, action) => {
      // console.log(action.payload);
      state.isSignedIn = action.payload;
    },
    SET_USER_LOADING: (state, action) => {
      state.userLoading = !state.userLoading;
    },
    LOGOUT_USER: (state, action) => {
      state.user = null;
      state.isSignedIn = false;
    },
  },
});

export const {SET_USER, LOGOUT_USER, SET_IS_SIGNED_IN, SET_USER_LOADING} =
  userSlice.actions;

//the thunkFUNTONS GO HERE
export const getLoggedInUser = () => async (dispatch, state) => {
  try {
    // const userInfo = await GoogleSignin.signInSilently();
    dispatch(SET_USER_LOADING());
    const currentUser = await GoogleSignin.getCurrentUser();
    const isSignedIn = await GoogleSignin.isSignedIn();
    dispatch(SET_USER(currentUser));
    dispatch(SET_IS_SIGNED_IN(isSignedIn));
    dispatch(SET_USER_LOADING());
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
    } else {
      console.log(error);
    }
  }
};

export const signIn = () => async (dispatch, state) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    dispatch(SET_USER(userInfo));
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

export const signOut = () => async (dispatch, state) => {
  try {
    await GoogleSignin.signOut();
    dispatch(LOGOUT_USER());
  } catch (error) {
    console.error(error);
  }
};

export default userSlice.reducer;
