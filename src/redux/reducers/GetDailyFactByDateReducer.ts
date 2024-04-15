import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getDailyFactActionAPI } from "../actions/DailyFactAPI";

interface DailyFactState {
  DailyFactInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: DailyFactState = {
  DailyFactInfo: [],
  authToken: '',
  status: "idle",
};

// { std: string; boardid: string; scholarshipid: string },
export const getDailyFactByDateAPI = createAsyncThunk<
  object,
  { state: RootState }
>("fact/fetchDailyFactInfo", async (data: object, { getState }) => {
  const response = await getDailyFactActionAPI(data);
  return response.data;
});

export const DailyFactData = createSlice({
  name: "fact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDailyFactByDateAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDailyFactByDateAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.DailyFactInfo = action.payload;
      })
      .addCase(getDailyFactByDateAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectDailyFactInfo = (state: RootState) =>
  state.DailyFact.DailyFactInfo;
export const selectDailyFactStatus = (state: RootState) => 
  state.DailyFact.status;

export default DailyFactData.reducer;
