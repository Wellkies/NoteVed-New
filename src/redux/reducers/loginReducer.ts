import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {
  getChildDetailsbyidAPIAction,
  PasswordLoginAction,
} from '../actions/PasswordLoginAPI';
import AsyncStorage from '../../utils/AsyncStorage';

interface UserState {
  userInfo: Object;
  authToken: null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  userInfo: {},
  authToken: null,
  status: 'idle',
};

export const fetchUserAsync = createAsyncThunk<
  object,
  {state: {user: UserState}}
>('user/fetchUserInfo', async (phone: object, {getState}) => {
  const response = await PasswordLoginAction(phone);
  return response.data;
});

export const getUserbyId = createAsyncThunk<
  string,
  string,
  {state: {user: UserState}}
>('user/getChildInfo', async (id: string, {getState}) => {
  const response = await getChildDetailsbyidAPIAction(id);
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload.user[0];
      state.authToken = action.payload.authtoken;
    },
    logout: state => {
      state.userInfo = {};
      state.authToken = null;
      AsyncStorage.clearStorage();
      AsyncStorage.removeValue('@user');
      // AsyncStorage.removeValue("@auth_Token")
      // await AsyncStorage.removeItem('userToken');
      // await AsyncStorage.removeItem('newUser');
      AsyncStorage.removeValue('userInfo');
    },
    updateUser: (state, action) => {
      state.userInfo = action.payload;
    },
    getDatafromAsync: (state, action) => {
      // console.log(action.payload,"----------------------------------actionppayload");

      state.userInfo = action.payload.user;
      state.authToken = action.payload.authtoken;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      })
      .addCase(getUserbyId.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUserbyId.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(getUserbyId.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});
export const {login, logout, getDatafromAsync, updateUser} = userSlice.actions;
// Export any necessary actions, selectors, and the reducer
export const selectUserInfo = (state: RootState) => state.user;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
