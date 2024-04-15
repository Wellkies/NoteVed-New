import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getCartItemActionAPI } from "../actions/MyStoreAPI";

interface CartItemState {
  CartItemInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: CartItemState = {
  CartItemInfo: [],
  authToken: "",
  status: "idle",
};

export const getCartItemAPI = createAsyncThunk<object, { state: RootState }>(
  "cartItem/fetchCartItemInfo",
  async (data: object, { getState }) => {
    const response = await getCartItemActionAPI(data);
    return response.data;
  }
);

export const CartItemData = createSlice({
  name: "cartItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItemAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.CartItemInfo = action.payload;
      })
      .addCase(getCartItemAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectCartItemInfo = (state: RootState) => state.Cart.CartItemInfo;
export const selectCartItemStatus = (state: RootState) => state.Cart.status;

export default CartItemData.reducer;
