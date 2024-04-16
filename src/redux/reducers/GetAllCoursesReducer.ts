import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getAllCoursesActionAPI } from "../actions/CoursesAPI";

interface AllCoursesState {
  AllCoursesInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: AllCoursesState = {
  AllCoursesInfo: [],
  authToken: "",
  status: "idle",
};

export const getAllCoursesAPI = createAsyncThunk<
  object,
  { state: RootState }
>("courses/fetchAllCoursesInfo", async (object, { getState }) => {
  const response = await getAllCoursesActionAPI();
  return response.data;
});

export const AllCoursesData = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoursesAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCoursesAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllCoursesInfo = action.payload;
      })
      .addCase(getAllCoursesAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAllCoursesInfo = (state: RootState) =>
  state.Courses.AllCoursesInfo;
export const selectAllCoursesStatus = (state: RootState) => 
  state.Courses.status;

export default AllCoursesData.reducer;