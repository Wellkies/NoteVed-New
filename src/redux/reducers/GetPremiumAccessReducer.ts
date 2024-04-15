import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getStandardAction } from "../actions/StudentStandard";
import { getPremiumAccessActionAPI } from "../actions/ScholarshipPremiumAPI";

interface PremiumAccesseState {
  Premiumaccess: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: PremiumAccesseState = {
  Premiumaccess: [],
  authToken: '',
  status: "idle",
};

export const getPremiumAccessAPI = createAsyncThunk<
  object,
  { state: { PremiumAccess: PremiumAccesseState } }
>("student/fetchpremiumAccess", async (data: object, { getState }) => {
  const response = await getPremiumAccessActionAPI(data);

  return response.data;
});

export const PremiumAccessData = createSlice({
  name: "premiumaccess",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPremiumAccessAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPremiumAccessAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.Premiumaccess = action.payload;
      })
      .addCase(getPremiumAccessAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectPremiumAccess = (state: RootState) =>
  state.PremiumAccess.Premiumaccess;
export const selectPremiumAccessStatus = (state: RootState) =>
  state.PremiumAccess.status;

export default PremiumAccessData.reducer;
