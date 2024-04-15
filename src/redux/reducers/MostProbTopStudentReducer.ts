import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import { getMostProbTopStudentActionAPI } from '../actions/TopStudentAPIs';

interface ProbTopStudentState {
  probtopstudent: Object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProbTopStudentState = {
  probtopstudent: [],
  status: 'idle',
};

export const getMostProbTopStudentAPI = createAsyncThunk<
  object,
  {state: {ProbableTopStudent: ProbTopStudentState}}
>('student/fetchprobableTopStudent', async (data: object, {getState}) => {
  const response = await getMostProbTopStudentActionAPI(data);

  return response.data;
});

export const ProbableTopStudentData = createSlice({
  name: 'ProbableTopStudent',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMostProbTopStudentAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getMostProbTopStudentAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.probtopstudent = action.payload;
      })
      .addCase(getMostProbTopStudentAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectProbTopStudent = (state: RootState) =>
  state.ProbableTopStudent.probtopstudent;
export const selectProbTopStudentStatus = (state: RootState) =>
  state.ProbableTopStudent.status;

export default ProbableTopStudentData.reducer;
