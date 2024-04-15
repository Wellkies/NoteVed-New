import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getZoomClassActionAPI } from "../actions/OnlineClassAPI";

interface ZoomClassState {
  ZoomClassInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: ZoomClassState = {
  ZoomClassInfo: [],
  authToken: "",
  status: "idle",
};

export const getZoomclassAPI = createAsyncThunk<object, { state: RootState }>(
  "class/fetchZoomClassInfo",
  async (data: object, { getState }) => {
    const response = await getZoomClassActionAPI(data);
    return response.data;
  }
);

export const ZoomClassData = createSlice({
  name: "class",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getZoomclassAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getZoomclassAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.ZoomClassInfo = action.payload;
      })
      .addCase(getZoomclassAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectZoomClassInfo = (state: RootState) =>
  state.ZoomClass.ZoomClassInfo;
export const selectZoomClassStatus = (state: RootState) =>
  state.ZoomClass.status;

export default ZoomClassData.reducer;
