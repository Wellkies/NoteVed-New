import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getStandardAction} from '../actions/StudentStandard';

interface StandardState {
  StudentStandard: Object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: StandardState = {
  StudentStandard: [],
  status: 'idle',
};

export const getStandard = createAsyncThunk<
  
  {state: {standard: StandardState}}
>('standard/fetchStudentStandard', async (string, {getState}) => {
  const response = await getStandardAction();

  return response.data;
});

export const StudentStandardData = createSlice({
  name: 'standard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getStandard.pending, state => {
        state.status = 'loading';
      })
      .addCase(getStandard.fulfilled, (state, action,) => {
        state.status = 'idle';
        state.StudentStandard = action.payload
      })
      .addCase(getStandard.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectStudentStandard = (state: RootState) =>
  state.standard.StudentStandard;
export const selectStudentStandardStatus = (state: RootState) => state.standard.status;

export default StudentStandardData.reducer;
