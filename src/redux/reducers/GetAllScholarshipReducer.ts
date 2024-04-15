import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getAllScholarshipAction } from "../actions/ScholarshipAPI";

interface ScholarshipState {
  StudentScholarship: Object[]; // Define UserInfo interface as per your data structure
  authToken: string,
  status: "idle" | "loading" | "failed";
}

const initialState: ScholarshipState = {
  StudentScholarship: [],
  authToken: '',
  status: "idle",
};

export const getScholarshipByClassAPI = createAsyncThunk<
  object,
  {state: { scholarship: ScholarshipState }}
>("scholarship/fetchStudentScholarship", async (data:object, { getState }) => {
  const response = await getAllScholarshipAction(data);

  return response.data;
});

export const StudentScholarshipData = createSlice({
  name: "scholarship",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScholarshipByClassAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getScholarshipByClassAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.StudentScholarship = action.payload;
      })
      .addCase(getScholarshipByClassAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectStudentScholarship = (state: RootState) =>
  state.scholarship.StudentScholarship;
export const selectStudentScholarshipStatus = (state: RootState) =>
  state.scholarship.status;

export default StudentScholarshipData.reducer;
