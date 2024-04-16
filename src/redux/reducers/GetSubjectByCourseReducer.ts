import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getAllCoursesActionAPI, getAllSubjectActionAPI } from "../actions/CoursesAPI";

interface AllSubjectState {
  AllSubjectsInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: AllSubjectState = {
  AllSubjectsInfo: [],
  authToken: "",
  status: "idle",
};

export const getAllSubByCourseAPI = createAsyncThunk<
  object,
  { state: RootState }
>("subjects/fetchAllSubjectsInfo", async (object, { getState }) => {
  const response = await getAllSubjectActionAPI();
  return response.data;
});

export const AllSubjectsData = createSlice({
  name: "subjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubByCourseAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSubByCourseAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllSubjectsInfo = action.payload;
      })
      .addCase(getAllSubByCourseAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAllSubjectsInfo = (state: RootState) =>
  state.Subjects.AllSubjectsInfo;
export const selectAllSubjectsStatus = (state: RootState) => 
  state.Subjects.status;

export default AllSubjectsData.reducer;