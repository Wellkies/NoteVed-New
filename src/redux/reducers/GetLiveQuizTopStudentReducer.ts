import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import { getLiveQuizTopStudentActionAPI } from '../actions/GetLiveQuizTopStudent';

interface LivequizStudentState {
    LivequizStudent: Object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: LivequizStudentState = {
  LivequizStudent: [],
  status: 'idle',
};

export const getLiveQuizTopStudentAPI = createAsyncThunk<
  object,
  {state: {LivequizStudentList: LivequizStudentState}}
>('student/fetchLiveQuizTopStudentData', async (data: object, {getState}) => {
  const response = await getLiveQuizTopStudentActionAPI(data);

  return response.data;
});

export const LiveQuizTopStudentData = createSlice({
  name: 'LivequizTostudent',
  initialState,
  reducers: {
    },

  extraReducers: builder => {
    builder
      .addCase(getLiveQuizTopStudentAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getLiveQuizTopStudentAPI.fulfilled,
        (state, action) => {
          state.status = 'idle';
          state.LivequizStudent = action.payload;
        },
      )
      .addCase(getLiveQuizTopStudentAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectLiveQuizTopStudentData = (state: RootState) =>
  state.LivequizStudentList.LivequizStudent;
export const selectLiveQuizTopStudentStatus = (state: RootState) =>
  state.LivequizStudentList.status;
export default LiveQuizTopStudentData.reducer;
