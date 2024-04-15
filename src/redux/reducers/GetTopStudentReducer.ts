import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getPrevYearTopActionStudentAPI } from "../actions/TopStudentAPIs";

interface TopStudentState {
  topstudent: Object[]; // Define UserInfo interface as per your data structure
  status: "idle" | "loading" | "failed";
}

const initialState: TopStudentState = {
  topstudent: [],
  status: "idle",
};

export const getPrevYearTopStudentAPI = createAsyncThunk<
  object,
  { state: { PreviousYearTopStudent: TopStudentState } }
>("student/fetchTopStudent", async (data: object, { getState }) => {
  const response = await getPrevYearTopActionStudentAPI(data);

  return response.data;
});

export const TopStudentData = createSlice({
  name: "TopStudent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPrevYearTopStudentAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPrevYearTopStudentAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.topstudent = action.payload;
      })
      .addCase(getPrevYearTopStudentAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectTopStudent = (state: RootState) =>
  state.PreviousYearTopStudent.topstudent;
export const selectTopStudentStatus = (state: RootState) =>
  state.PreviousYearTopStudent.status;

export default TopStudentData.reducer;
