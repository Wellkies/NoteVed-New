import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getChildAllOrdersActionAPI } from "../actions/MyStoreAPI";

interface AllOrdersState {
  AllOrdersInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: string;
  status: "idle" | "loading" | "failed";
}

const initialState: AllOrdersState = {
  AllOrdersInfo: [],
  authToken: "",
  status: "idle",
};

export const getChildAllOrdersAPI = createAsyncThunk<object, { state: RootState }>(
  "allOrders/fetchAllOrders",
  async (data: object, { getState }) => {
    const response = await getChildAllOrdersActionAPI(data);
    return response.data;
  }
);

export const AllOrdersData = createSlice({
  name: "allOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChildAllOrdersAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChildAllOrdersAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllOrdersInfo = action.payload;
      })
      .addCase(getChildAllOrdersAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAllOrdersInfo = (state: RootState) => 
  state.allOrders.AllOrdersInfo;
export const selectAllOrdersStatus = (state: RootState) =>
  state.allOrders.status;

export default AllOrdersData.reducer;