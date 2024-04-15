import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getUserAllAddressActionAPI } from "../actions/MyStoreAPI";

interface AllAddressState {
  AllAddressInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: AllAddressState = {
  AllAddressInfo: [],
  authToken: "",
  status: "idle",
};

export const getUserAllAddressAPI = createAsyncThunk<
  object,
  { state: RootState }
>("address/fetchAllAddressInfo", async (data: object, { getState }) => {
  const response = await getUserAllAddressActionAPI(data);
  return response.data;
});

export const AllAddressData = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAllAddressAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAllAddressAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllAddressInfo = action.payload;
      })
      .addCase(getUserAllAddressAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAllAddressInfo = (state: RootState) =>
  state.Address.AllAddressInfo;
export const selectAllAddressStatus = (state: RootState) => 
  state.Address.status;

export default AllAddressData.reducer;