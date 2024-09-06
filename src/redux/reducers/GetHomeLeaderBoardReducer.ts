import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getHomeScreenTopStudentActionAPI } from "../actions/LiveQuizAPI";


interface HomeTopStudentState {
  HomeTopStudent: Object[]; // Define UserInfo interface as per your data structure
  status: "idle" | "loading" | "failed";
}

const initialState: HomeTopStudentState = {
  HomeTopStudent: [],
  status: "idle",
};

export const getHomeTopStudentAPI = createAsyncThunk<{
  state: { HomeTopStudentList: HomeTopStudentState };
}>("student/fetchHomeTopStudentData", async (string, { getState }) => {
  const response = await getHomeScreenTopStudentActionAPI();
  return response.data;
});

export const UserhomeTopStudentData = createSlice({
  name: "HomeTopStudent",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getHomeTopStudentAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHomeTopStudentAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.HomeTopStudent = action.payload;
      })
      .addCase(getHomeTopStudentAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectHomeTopStudentData = (state: RootState) =>
  state.HomeTopStudentList.HomeTopStudent;
export const selectHomeTopStudentStatus = (state: RootState) =>
  state.HomeTopStudentList.status;
export default UserhomeTopStudentData.reducer;
