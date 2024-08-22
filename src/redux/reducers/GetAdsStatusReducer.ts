import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import { getAdsStatusActionAPI } from '../actions/GetAddStatus';


interface AdsState {
  AdsStatus: object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AdsState = {
    AdsStatus: [],
  status: 'idle',
};

export const getAdsStatus = createAsyncThunk<{state: {AdsStates: AdsState}}>(
  'student/fetchAdsStatus',
  async (string, {getState}) => {
    const response = await getAdsStatusActionAPI();
    return response.data;
  },
);

export const AdsStatusData = createSlice({
  name: 'AdsStates',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAdsStatus.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAdsStatus.fulfilled, (state, action) => {
        state.status = 'idle';
        state.AdsStatus=action.payload;
       
      })
      .addCase(getAdsStatus.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAdsStatus = (state: RootState) =>
  state.AdsStates.AdsStatus;
export const selectAdsStatuss = (state: RootState) =>
  state.AdsStates.status;

export default AdsStatusData.reducer;
