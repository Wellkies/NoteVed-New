import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getBoardAction} from '../actions/StudentBoard';
import { getUnlockChildActionAPI } from '../actions/PreviousYearAPI';

interface UnlockStudentState {
  Unlockstudent: object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UnlockStudentState = {
  Unlockstudent: [],
  authToken: '',
  status: 'idle',
};

export const getUnlockChildAPI = createAsyncThunk<{state: {UnlockStudent: UnlockStudentState}}>(
  'student/fetchUnlockStudent',
  async (string, {getState}) => {
    const response = await getUnlockChildActionAPI();
    return response.data;
  },
);

export const UnlockStudentData = createSlice({
  name: 'UnlockStudent',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUnlockChildAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUnlockChildAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Unlockstudent=action.payload;
        
      })
      .addCase(getUnlockChildAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectUnlockStudent = (state: RootState) =>
  state.UnlockStudent.Unlockstudent;
export const selectUnlockStudentStatus = (state: RootState) =>
  state.UnlockStudent.status;

export default UnlockStudentData.reducer;
