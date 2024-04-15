import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getChildRevisionDetailsActionAPI } from "../actions/SubjectsAPI";

interface RevisionChildState {
  Revisionchild: object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: RevisionChildState = {
  Revisionchild: [],
  authToken: "",
  status: "idle",
};

export const getChildRevisionDetailsAPI = createAsyncThunk<
  object,
  {state: { RevisionData: RevisionChildState }}
>("student/fetchRevisionChild", async (data:object, { getState }) => {
  const response = await getChildRevisionDetailsActionAPI(data);
  return response.data;
});

export const RevisionChildData = createSlice({
  name: "RevisionChild",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChildRevisionDetailsAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChildRevisionDetailsAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.Revisionchild = action.payload;
      })
      .addCase(getChildRevisionDetailsAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectRevisionChild = (state: RootState) =>
  state.RevisionData.Revisionchild;
export const selectRevisionChildStatus = (state: RootState) =>
  state.RevisionData.status;

export default RevisionChildData.reducer;
