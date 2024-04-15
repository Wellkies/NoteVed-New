import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getCouponActionAPI} from '../actions/ScholarshipPremiumAPI';

interface CouponState {
  Coupon: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CouponState = {
  Coupon: [],
  authToken: '',
  status: 'idle',
};

export const getCouponAPI = createAsyncThunk<
 
  {state: {CouponData: CouponState}}
>('Coupon/fetchpCouponData', async (string,{getState}) => {
  const response = await getCouponActionAPI();

    return response.data;
});

export const StudentCouponData = createSlice({
  name: 'CouponData',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getCouponAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getCouponAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Coupon = action.payload;
      })
      .addCase(getCouponAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});


// Export any necessary actions, selectors, and the reducer
export const selectCouponData = (state: RootState) =>
  state.CouponData.Coupon;
export const selectCouponDataStatus = (state: RootState) =>
  state.CouponData.status;

export default StudentCouponData.reducer;
