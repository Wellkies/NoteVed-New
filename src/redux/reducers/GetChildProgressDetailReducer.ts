import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getChildProgressDetailAction} from '../actions/GetChildProgressDetails';

interface ProgressState {
  ChildProgressDetails: Object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProgressState = {
  ChildProgressDetails: [],
  status: 'idle',
};

export const getChildProgressDetailAPI = createAsyncThunk<
  object,
  {state: {ChildProgressData: ProgressState}}
>('student/fetchChildProgressDetailData', async (data: object, {getState}) => {
  const response = await getChildProgressDetailAction(data);
  return response.data;
});

export const ChildProgressDetailData = createSlice({
  name: 'ChildProgressData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getChildProgressDetailAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getChildProgressDetailAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.ChildProgressDetails = action.payload;
      })
      .addCase(getChildProgressDetailAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectChildDetailData = (state: RootState) =>
  state.ChildProgressData.ChildProgressDetails;
export const selectChildDetailsStatus = (state: RootState) =>
  state.ChildProgressData.status;

export default ChildProgressDetailData.reducer;
