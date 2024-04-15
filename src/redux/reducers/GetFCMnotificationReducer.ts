import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/Store";
import { getNotificationActionAPI } from "../actions/NotificationAPI";

interface FcmNotificationState {
  FcmNotificationInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: "idle" | "loading" | "failed";
}

const initialState: FcmNotificationState = {
  FcmNotificationInfo: [],
  authToken: "",
  status: "idle",
};

export const getFCMnotificationAPI = createAsyncThunk<
  { state: {Notification:FcmNotificationState }}
>(
  "notification/fetchFcmNotificationInfo",
  async ( string,{ getState }) => {
    const response = await getNotificationActionAPI();
    return response.data;
  }
);
// export const getBoard = createAsyncThunk<{state: {Board: BoardState}}>(
//   'Board/fetchStudentBoard',
//   async (string, {getState}) => {
//     const response = await getBoardAction();
//     return response.data;
//   },
// );
export const NotificationData = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFCMnotificationAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFCMnotificationAPI.fulfilled, (state, action) => {
        state.status = "idle";
        state.FcmNotificationInfo = action.payload;
      })
      .addCase(getFCMnotificationAPI.rejected, (state, action) => {
        state.status = "failed";
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectFcmNotificationInfo = (state: RootState) =>
  state.Notification.FcmNotificationInfo;
export const selectFcmNotificationStatus = (state: RootState) =>
  state.Notification.status;

export default NotificationData.reducer;
