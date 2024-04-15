import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getTopicDetailsActionAPI } from "../actions/SubjectsAPI";

interface TopicDetailsState {
  TopicDetails: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: TopicDetailsState = {
  TopicDetails: [],
  authToken: "",
  status: "idle",
};

export const getTopicDetailsAPI = createAsyncThunk<
  object,
  { state: { TopicDetails: TopicDetailsState } }
>("student/fetchtopicdetails", async (data: object, { getState }) => {
  const response = await getTopicDetailsActionAPI(data);

  return response.data;
});

export const TopicDetailsData = createSlice({
  name: "topicdetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopicDetailsAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopicDetailsAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.TopicDetails = action.payload;
      })
      .addCase(getTopicDetailsAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectTopicDetails = (state: RootState) =>
  state.Topicdetails.TopicDetails;
export const selectTopicDetailsStatus = (state: RootState) =>
  state.Topicdetails.status;

export default TopicDetailsData.reducer;
