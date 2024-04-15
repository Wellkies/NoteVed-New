import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getAllProductActionAPI } from "../actions/MyStoreAPI";

interface AllProductState {
  AllProduct: Object[]; // Define UserInfo interface as per your data structure
  authToken: string;
  status: "idle" | "loading" | "failed";
}

const initialState: AllProductState = {
  AllProduct: [],
  authToken: "",
  status: "idle",
};

export const getAllProductAPI = createAsyncThunk<{
  state: { allProduct: AllProductState };
}>("allProduct/fetchAllProduct", async (string, { getState }) => {
  const response = await getAllProductActionAPI();
  return response.data;
});

export const AllProductData = createSlice({
  name: "allProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProductAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllProduct = action.payload;
      })
      .addCase(getAllProductAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectAllProduct = (state: RootState) =>
  state.allProduct.AllProduct;
export const selectAllProductStatus = (state: RootState) =>
  state.allProduct.status;

export default AllProductData.reducer;
