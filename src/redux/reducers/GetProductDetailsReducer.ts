import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getProductByIdActionAPI } from "../actions/MyStoreAPI";

interface ProductDetailsState {
  ProductDetailsInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: ProductDetailsState = {
  ProductDetailsInfo: [],
  authToken: "",
  status: "idle",
};

export const getProductByIdAPI = createAsyncThunk<object, { state: RootState }>(
  "productdetails/fetchProductDetailsInfo",
  async (data: object, { getState }) => {
    const response = await getProductByIdActionAPI(data);
    return response.data;
  }
);

export const ProductDetailsData = createSlice({
  name: "productdetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductByIdAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductByIdAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.ProductDetailsInfo = action.payload;
      })
      .addCase(getProductByIdAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectProductDetailsInfo = (state: RootState) =>
  state.ProductDetails.ProductDetailsInfo;
export const selectProductDetailsStatus = (state: RootState) =>
  state.ProductDetails.status;

export default ProductDetailsData.reducer;
