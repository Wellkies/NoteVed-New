import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getStateAction} from '../actions/StudentBoard';

interface StudentState {
  StudentState: object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: StudentState = {
  StudentState: [],
  status: 'idle',
};

export const getState = createAsyncThunk<{state: {StateData: StudentState}}>(
  'State/fetchStudentState',
  async (string, {getState}) => {
    const response = await getStateAction();
    return response.data;
  },
);

export const StudentStateData = createSlice({
  name: 'State',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getState.pending, state => {
        state.status = 'loading';
      })
      .addCase(getState.fulfilled, (state, action) => {
        state.status = 'idle';
        state.StudentState = action.payload;
        // state.StudentBoard.push(action.payload);
      })
      .addCase(getState.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectStudentState = (state: RootState) =>
  state.StateData.StudentState;
export const selectStudentStateStatus = (state: RootState) =>
  state.StateData.status;

export default StudentStateData.reducer;
