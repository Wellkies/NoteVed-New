import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getTopicBySubClassActionAPI } from "../actions/SubjectsAPI";

interface TopicState {
  TopicInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: TopicState = {
  TopicInfo: [],
  authToken: '',
  status: "idle",
};

// { std: string; boardid: string; scholarshipid: string },
export const getTopicBySubClassAPI = createAsyncThunk<
  object,
  { state: RootState }
>("topic/fetchTopicInfo", async (data: object, { getState }) => {
  const response = await getTopicBySubClassActionAPI(data);
  return response.data;
});

export const TopicData = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopicBySubClassAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopicBySubClassAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.TopicInfo = action.payload;
      })
      .addCase(getTopicBySubClassAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectTopicInfo = (state: RootState) =>
  state.Topic.TopicInfo;
export const selectTopicStatus = (state: RootState) => state.Topic.status;

export default TopicData.reducer;
