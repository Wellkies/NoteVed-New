import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';


interface ExamTimeState {
  ExamTimeTaken: number; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ExamTimeState = {
  ExamTimeTaken: 0,
  status: 'idle',
};

export const ExamTimeData = createSlice({
  name: 'ExamTime',
  initialState,
  reducers: {
    handleExamTimeTaken: (state, action) => {
      state.ExamTimeTaken = action.payload;
    },
  },
});

export const {handleExamTimeTaken}=ExamTimeData.actions
// Export any necessary actions, selectors, and the reducer
export const selectExamTime = (state: RootState) =>
  state.ExamTime.ExamTimeTaken;
export const selectExamTimeStatus = (state: RootState) =>
  state.ExamTime.status;

export default ExamTimeData.reducer;
