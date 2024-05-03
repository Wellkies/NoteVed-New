import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getAllMembershipAPI } from "../actions/GetAllMembership";

interface AllMembershipState {
    AllMembershipInfo: Object[]; // Define UserInfo interface as per your data structure
    authToken: String;
    status: "idle" | "loading" | "failed";
  }

  const initialState: AllMembershipState = {
    AllMembershipInfo: [],
    authToken: "",
    status: "idle",
  };

  export const getAllMembershipDataAPI = createAsyncThunk<object, { state: RootState }>(
    "AllMembershipdetails/fetchAllMembershipInfo",
    async (data: object, { getState }) => {
      const response = await getAllMembershipAPI();
      return response.data;
    }
  );

  export const AllMembershipDetailsData = createSlice({
    name: "AllMembershipDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllMembershipDataAPI.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getAllMembershipDataAPI.fulfilled, (state, action) => {
          state.status = "idle";
          state.AllMembershipInfo = action.payload;
        })
        .addCase(getAllMembershipDataAPI.rejected, (state, action) => {
          state.status = "failed";
          // You can handle failure here if needed
        });
    },
  });

  // Export any necessary actions, selectors, and the reducer
export const selectAllMembershipDetailsInfo = (state: RootState) =>
    state.AllMembershipDetails.AllMembershipInfo
  export const selectAllMembershipDetailsStatus = (state: RootState) =>
    state.AllMembershipDetails.status;
  
  export default AllMembershipDetailsData.reducer;