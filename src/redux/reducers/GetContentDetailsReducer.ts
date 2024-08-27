import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getTopicBySubClassActionAPI} from '../actions/SubjectsAPI';
import {getContentByContentIdActionAPI, getContentByTopicIdActionAPI} from '../actions/CoursesAPI';

interface ContentDetailsState {
  ContentDetailsInfo: Object[]; // Define UserInfo interface as per your data structure
  ContentQuiz: object[];
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ContentDetailsState = {
  ContentDetailsInfo: [],
  ContentQuiz: [],
  authToken: '',
  status: 'idle',
};

// export const getContentByTopicIdAPI = createAsyncThunk<object, { state: RootState }>(
//   "contentdetails/fetchContentDetailsInfo",
//   async (data: object, { getState }) => {
//     const response = await getContentByTopicIdActionAPI(data);
//     return response.data;
//   }
// );

export const getContentByTopicIdAPI = createAsyncThunk<
  object,
  {state: {ContentDetails: ContentDetailsState}}
>(
  'contentdetails/fetchContentDetailsInfo',
  async (data: object, {getState}) => {
    const response = await getContentByTopicIdActionAPI(data);
    return response.data;
  },
);

export const getContentByContentIdAPI = createAsyncThunk<
  object,
  {state: {ContentDetails: ContentDetailsState}}
>(
  'contentdetails/selectContentQuiz',
  async (data: object, {getState}) => {
    const response = await getContentByContentIdActionAPI(data);
    return response.data;
  },
);

export const ContentDetailsData = createSlice({
  name: 'contentdetails',
  initialState,
  // reducers: {},
  reducers: {
    dataclearstate: state => {
      state.ContentDetailsInfo = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContentByTopicIdAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getContentByTopicIdAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.ContentDetailsInfo = action.payload;
      })
      .addCase(getContentByTopicIdAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      })
      .addCase(getContentByContentIdAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getContentByContentIdAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.ContentQuiz = action.payload;
      })
      .addCase(getContentByContentIdAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectContentQuiz = (state: RootState) =>
  state.ContentDetails.ContentQuiz;
export const selectContentDetailsInfo = (state: RootState) =>
  state.ContentDetails.ContentDetailsInfo;
export const selectContentDetailsStatus = (state: RootState) =>
  state.ContentDetails.status;
export const {dataclearstate} = ContentDetailsData.actions;

export default ContentDetailsData.reducer;
