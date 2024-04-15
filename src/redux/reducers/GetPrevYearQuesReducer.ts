import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getPreviousYearQuestionActionAPI} from '../actions/PreviousYearAPI';

interface PreviousYearState {
  Previousyear: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PreviousYearState = {
  Previousyear: [],
  authToken: '',
  status: 'idle',
};

export const getPreviousYearQuestionAPI = createAsyncThunk<
  object,
  {state: {PreviousYear: PreviousYearState}}
>('student/fetchPreviousYear', async (data: object, {getState}) => {
  const response = await getPreviousYearQuestionActionAPI(data);
  return response.data;
});

export const PreviousYearData = createSlice({
  name: 'PreviousYear',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPreviousYearQuestionAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPreviousYearQuestionAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Previousyear = action.payload;
      })
      .addCase(getPreviousYearQuestionAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectPreviousYear = (state: RootState) =>
  state.PreviousYear.Previousyear;
export const selectPreviousYearStatus = (state: RootState) =>
  state.PreviousYear.status;

export default PreviousYearData.reducer;
