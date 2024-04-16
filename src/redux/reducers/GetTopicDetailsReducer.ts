import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getTopicBySubClassActionAPI } from "../actions/SubjectsAPI";

interface TopicDetailsState {
  TopicDetailsInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: TopicDetailsState = {
  TopicDetailsInfo: [],
  authToken: "",
  status: "idle",
};

export const getTopicBySubIdAPI = createAsyncThunk<object, { state: RootState }>(
  "topicdetails/fetchTopicDetailsInfo",
  async (data: object, { getState }) => {
    const response = await getTopicBySubClassActionAPI(data);
    return response.data;
  }
);

export const TopicDetailsBySubData = createSlice({
  name: "topicdetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopicBySubIdAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopicBySubIdAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.TopicDetailsInfo = action.payload;
      })
      .addCase(getTopicBySubIdAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectTopicDetailsInfo = (state: RootState) =>
  state.TopicBySubDetails.TopicDetailsInfo;
export const selectTopicDetailsStatus = (state: RootState) =>
  state.TopicBySubDetails.status;

export default TopicDetailsBySubData.reducer;
