import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';


interface ExamTestState {
  setExamName: string; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ExamTestState = {
  setExamName: '',
  status: 'idle',
};

export const ExamNameData = createSlice({
  name: 'ExamName',
  initialState,
  reducers: {
    handleSetExamName: (state, action) => {
      state.setExamName = action.payload;
    },
  },
  
});

export const {handleSetExamName}=ExamNameData.actions
// Export any necessary actions, selectors, and the reducer
export const selectExamName = (state: RootState) =>
  state.ExamName.setExamName;
export const selectExamNameStatus = (state: RootState) =>
  state.ExamName.status;

export default ExamNameData.reducer;
