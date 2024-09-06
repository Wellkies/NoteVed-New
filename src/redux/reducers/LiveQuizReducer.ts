import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getLiveQuizAPIAction } from "../actions/LiveQuizAPI";

interface LiveQuizState {
  LiveQuiz: Object[]; // Define UserInfo interface as per your data structure
  status: "idle" | "loading" | "failed";
}

const initialState: LiveQuizState = {
  LiveQuiz: [],
  status: "idle",
};

export const getLiveQuizAPI = createAsyncThunk<object, { state: RootState }>(
  "LiveQuiz/fetchLiveQuizData",
  async (data: object, { getState }) => {
    const response = await getLiveQuizAPIAction(data);
    // Storage.storeObject('SubID', data.subjectid);
    return response.data;
  }
);

export const LiveQuizData = createSlice({
  name: "LiveQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLiveQuizAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLiveQuizAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.LiveQuiz = action.payload;
      })
      .addCase(getLiveQuizAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectLiveQuizData = (state: RootState) =>
  state.LiveQuizList.LiveQuiz;
export const selectLiveQuizStatus = (state: RootState) =>
  state.LiveQuizList.status;

export default LiveQuizData.reducer;
