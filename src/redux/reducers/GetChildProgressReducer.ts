import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getChildProgressAction} from '../actions/GetChildProgress';

interface ProgressState {
  ChildProgressDetails: Object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProgressState = {
  ChildProgressDetails: [],
  status: 'idle',
};

export const getChildProgressAPI = createAsyncThunk<
  object,
  {state: {ChildProgress: ProgressState}}
>('student/fetchChildProgressData', async (data: object, {getState}) => {
  const response = await getChildProgressAction(data);
  return response.data;
});

export const ChildProgressableData = createSlice({
  name: 'ChildProgress',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getChildProgressAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getChildProgressAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.ChildProgressDetails = action.payload;
      })
      .addCase(getChildProgressAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectChildProgressData = (state: RootState) =>
  state.ChildProgress.ChildProgressDetails;
export const selectProgressStatus = (state: RootState) =>
  state.ChildProgress.status;

export default ChildProgressableData.reducer;
