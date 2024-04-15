import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getOrderDetailsActionAPI } from "../actions/MyStoreAPI";

interface OrderDetailsState {
  OrderInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: OrderDetailsState = {
  OrderInfo: [],
  authToken: "",
  status: "idle",
};

export const getOrderDetailsAPI = createAsyncThunk<object, { state: RootState }>(
  "orderById/fetchOrderInfo",
  async (data: object, { getState }) => {
    const response = await getOrderDetailsActionAPI(data);
    return response.data;
  }
);

export const OrderDetailsData = createSlice({
  name: "orderById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetailsAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderDetailsAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.OrderInfo = action.payload;
      })
      .addCase(getOrderDetailsAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectOrderInfo = (state: RootState) =>
  state.OrderByIdInfo.OrderInfo;
export const selectOrderInfoStatus = (state: RootState) =>
  state.OrderByIdInfo.status;

export default OrderDetailsData.reducer;
