import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { CheckDeviceTokenActionApi } from "../actions/CheckDeviceTokenApi";


interface DeviceTokenState {
  Devicetokeninfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: string,
  status: "idle" | "loading" | "failed";
}

const initialState: DeviceTokenState = {
  Devicetokeninfo:[],
  authToken: '',
  status: "idle",
};

// export const CheckDeviceTokenApi = createAsyncThunk<
//   object,
//   {state: {DeviceToken: DeviceTokenState}}
// >("student/fetchdeviceToken", async (data:object, { getState }) => {
//   const response = await CheckDeviceTokenActionApi(data);
//   return response.data;
// });

export const CheckDeviceTokenApi = createAsyncThunk<object, {state: {DeviceToken: DeviceTokenState}}>(
  "student/fetchdeviceToken",
  async (data: object, { getState }) => {
    const response = await CheckDeviceTokenActionApi(data);
    return response.data;
  }
);
export const DeviceTokenData = createSlice({
  name: "devicetoken",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CheckDeviceTokenApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CheckDeviceTokenApi.fulfilled, (state, action) => {
        state.status = "idle";
        state.Devicetokeninfo = action.payload;
      })
      .addCase(CheckDeviceTokenApi.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectDeviceToken = (state: RootState) =>
  state.DeviceToken.Devicetokeninfo;
export const selectDeviceTokenStatus = (state: RootState) =>
  state.DeviceToken.status;

export default DeviceTokenData.reducer;
