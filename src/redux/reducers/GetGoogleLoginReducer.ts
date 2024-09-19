import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {googleEmailLogin} from '../actions/EmailLogin';

interface GmailUserState {
  GmailUser: Object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: GmailUserState = {
  GmailUser: [],
  status: 'idle',
};

export const getGmailUserAPI = createAsyncThunk<{
  state: {GmailUser: GmailUserState};
}>('user/getChildInfo', async (string, {getState}) => {
  const response = await googleEmailLogin();
  return response.data;
});

export const GmailUsertData = createSlice({
  name: 'GmailUser',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getGmailUserAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getGmailUserAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.GmailUser = action.payload;
      })
      .addCase(getGmailUserAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectGmailUserData = (state: RootState) =>
  state.GmailUserList.GmailUser;
export const selectGmailUserStatus = (state: RootState) =>
  state.GmailUserList.status;
export default GmailUsertData.reducer;
