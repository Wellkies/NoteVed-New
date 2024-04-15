import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { VerifyPhoneNumActionAPI } from "../actions/PhoneVerifyAPI";

interface VerifyPhoneState {
  VerifyPhInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: VerifyPhoneState = {
  VerifyPhInfo: [],
  authToken: "",
  status: "idle",
};

export const childPhoneVerifyAPI = createAsyncThunk<
  object,
  { state: RootState }
>("verifyPhn/fetchVerifyPhInfo", async (data: object, { getState }) => {
  const response = await VerifyPhoneNumActionAPI(data);
  return response.data;
});

export const VerifyPhoneData = createSlice({
  name: "verifyPhn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(childPhoneVerifyAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(childPhoneVerifyAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.VerifyPhInfo = action.payload;
      })
      .addCase(childPhoneVerifyAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectVerifyPhInfo = (state: RootState) =>
  state.VerifyPhone.VerifyPhInfo;
export const selectVerifyPhStatus = (state: RootState) =>
  state.VerifyPhone.status;

export default VerifyPhoneData.reducer;
