import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getAllSubjectLevelAPI} from '../actions/GetAllSubjectLevels';

interface AllSubjectLevelState {
  AllSubjectLevelInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AllSubjectLevelState = {
  AllSubjectLevelInfo: [],
  authToken: '',
  status: 'idle',
};

export const getAllSubjectLevelDataAPI = createAsyncThunk<
  object,
  {state: RootState}
>(
  'AllSubjectLeveldetails/fetchAllSubjectLevelInfo',
  async (data: object, {getState}) => {
    const response = await getAllSubjectLevelAPI();
    return response.data;
  },
);

export const AllSubjectLevelData = createSlice({
  name: 'AllSubjectLevelDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllSubjectLevelDataAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllSubjectLevelDataAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.AllSubjectLevelInfo = action.payload;
      })
      .addCase(getAllSubjectLevelDataAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAllSubjectLevelInfo = (state: RootState) =>
  state.AllSubjectLevelDetails.AllSubjectLevelInfo;
export const selectAllSubjectLevelStatus = (state: RootState) =>
  state.AllSubjectLevelDetails.status;

export default AllSubjectLevelData.reducer;
