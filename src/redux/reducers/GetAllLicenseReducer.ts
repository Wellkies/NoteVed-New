import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getAllLicenseDetailsAPI} from '../actions/GetAllLicenseDetails';

interface AllLicenseState {
  AllLicenseInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AllLicenseState = {
    AllLicenseInfo: [],
  authToken: '',
  status: 'idle',
};

export const getAllLicenseDataAPI = createAsyncThunk<
  object,
  {state: RootState}
>(
  'AllLicensedetails/fetchAllLicenseLevelInfo',
  async (data: object, {getState}) => {
    const response = await getAllLicenseDetailsAPI();
    return response.data;
  },
);

export const AllLicenseData = createSlice({
  name: 'AllLicensedetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllLicenseDataAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllLicenseDataAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.AllLicenseInfo = action.payload;
      })
      .addCase(getAllLicenseDataAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAllLicenseLevelInfo = (state: RootState) =>
  state.AllLicensedetails.AllLicenseInfo;
export const selectAllLicenseLevelStatus = (state: RootState) =>
  state.AllLicensedetails.status;

export default AllLicenseData.reducer;
