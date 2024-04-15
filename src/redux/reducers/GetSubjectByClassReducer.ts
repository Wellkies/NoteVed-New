import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getSubjectByClassActionAPI } from "../actions/SubjectsAPI";

interface SubjectState {
  SubjectInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: SubjectState = {
  SubjectInfo: [],
  authToken: "",
  status: "idle",
};

// { std: string; boardid: string; scholarshipid: string },
export const getSubjectByClassAPI = createAsyncThunk<
  object,
  { state: RootState }
>("subject/fetchSubjectInfo", async (data: object, { getState }) => {
  const response = await getSubjectByClassActionAPI(data);
  return response.data;
});

export const SubjectData = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubjectByClassAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubjectByClassAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.SubjectInfo = action.payload;
      })
      .addCase(getSubjectByClassAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectSubjectInfo = (state: RootState) =>
  state.Subject.SubjectInfo;
export const selectSubjectStatus = (state: RootState) => 
  state.Subject.status;

export default SubjectData.reducer;
