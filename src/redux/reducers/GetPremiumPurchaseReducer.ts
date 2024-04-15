import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getScholarshipPremiumActionAPI} from '../actions/ScholarshipPremiumAPI';

interface PremiumPurchaseState {
  PremiumPurchase: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PremiumPurchaseState = {
  PremiumPurchase: [],
  authToken: '',
  status: 'idle',
};

export const getScholarshipPremiumAPI = createAsyncThunk<
  object,
  {state: {Premiumpurchase: PremiumPurchaseState}}
>('student/fetchpremiumpurchase', async (data: object, {getState}) => {
  const response = await getScholarshipPremiumActionAPI(data);

    return response.data;
});

export const PremiumPurchaseData = createSlice({
  name: 'premiumpurchase',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getScholarshipPremiumAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getScholarshipPremiumAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.PremiumPurchase = action.payload;
      })
      .addCase(getScholarshipPremiumAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});


// Export any necessary actions, selectors, and the reducer
export const selectPremiumPurchase = (state: RootState) =>
  state.Premiumpurchase.PremiumPurchase;
export const selectPremiumPurchaseStatus = (state: RootState) =>
  state.Premiumpurchase.status;

export default PremiumPurchaseData.reducer;
