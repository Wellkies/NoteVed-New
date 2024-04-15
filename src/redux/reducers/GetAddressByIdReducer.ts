import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getAddressByIdActionAPI } from "../actions/MyStoreAPI";

interface AddressDetailsState {
  AddressInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: AddressDetailsState = {
  AddressInfo: [],
  authToken: "",
  status: "idle",
};

export const getAddressByIdAPI = createAsyncThunk<object, { state: RootState }>(
  "addressById/fetchAddressInfo",
  async (data: object, { getState }) => {
    const response = await getAddressByIdActionAPI(data);
    return response.data;
  }
);

export const AddressDetailsData = createSlice({
  name: "addressById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddressByIdAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAddressByIdAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.AddressInfo = action.payload;
      })
      .addCase(getAddressByIdAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAddressInfo = (state: RootState) =>
  state.AddressByIdInfo.AddressInfo;
export const selectAddressInfoStatus = (state: RootState) =>
  state.AddressByIdInfo.status;

export default AddressDetailsData.reducer;
