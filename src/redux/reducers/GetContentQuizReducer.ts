import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getContentQuizActionAPI } from "../actions/SubjectsAPI";

interface ContentQuizState {
  ContentQuiz: object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: ContentQuizState = {
  ContentQuiz: [],
  authToken: "",
  status: "idle",
};

export const getContentQuizAPI = createAsyncThunk<
  object,
  {state: { ContentData: ContentQuizState }}
>("student/fetchContentQuiz", async (data:object, { getState }) => {
  const response = await getContentQuizActionAPI(data);
  return response.data;
});

export const ContentQuizData = createSlice({
  name: "contentquiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContentQuizAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContentQuizAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.ContentQuiz = action.payload;
      })
      .addCase(getContentQuizAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectContentQuiz = (state: RootState) =>
  state.ContentData.ContentQuiz;
export const selectContentQuizStatus = (state: RootState) =>
  state.ContentData.status;

export default ContentQuizData.reducer;
