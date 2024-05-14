import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getAllSubjectByCourseIdAPI} from '../actions/GetAllSubjectByCourseID';

interface AllSubjectByCourseIdState {
  AllSubjBycourseIdInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AllSubjectByCourseIdState = {
  AllSubjBycourseIdInfo: [],
  authToken: '',
  status: 'idle',
};

export const getAllSubByCourseIdAPI = createAsyncThunk<
  object,
  {state: RootState}
>(
  'AllSubjectLeveldetails/fetchAllSubjectLevelInfo',
  async (data: object, {getState}) => {
    const response = await getAllSubjectByCourseIdAPI(data);
    return response.data;
  },
);

export const AllSubjectByCourseID = createSlice({
  name: 'AllSubByCourseIdDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllSubByCourseIdAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllSubByCourseIdAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.AllSubjBycourseIdInfo = action.payload;
      })
      .addCase(getAllSubByCourseIdAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAllSubByCourseIdInfo = (state: RootState) =>
  state.AllSubByCourseIdDetails.AllSubjBycourseIdInfo;
export const selectAllSubByCourseIdStatus = (state: RootState) =>
  state.AllSubByCourseIdDetails.status;

export default AllSubjectByCourseID.reducer;
