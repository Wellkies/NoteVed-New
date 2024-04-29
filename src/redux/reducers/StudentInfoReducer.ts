import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getChildDetailsAPIAction } from "../actions/StudentInfo"; // Assuming you have a function fetchUserInfo for fetching user info
import AsyncStorage from "../../utils/AsyncStorage";
import { dispatch } from "../store/reducerHook";
import { updateUser } from "./loginReducer";

interface StudentState {
  StudentInfo: Object; // Define UserInfo interface as per your data structure
  status: "idle" | "loading" | "failed";
}

const initialState: StudentState = {
  StudentInfo: {},
  status: "idle",
};

export const getChildDetailsAPI = createAsyncThunk<
  string,
  string,
  { state: { student: StudentState } }
>("student/fetchStudentInfo", async (id: string, { getState }) => {
  console.log(id, "id..........................");
  const response = await getChildDetailsAPIAction(id);
  return response.data;
});

export const StudentData = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChildDetailsAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChildDetailsAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.StudentInfo = action.payload;
      })
      .addCase(getChildDetailsAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectStudentInfo = (state: RootState) =>
  state.student.StudentInfo;
export const selectStudentStatus = (state: RootState) => state.student.status;

export default StudentData.reducer;
