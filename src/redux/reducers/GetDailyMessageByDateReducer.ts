import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {
  getDailyFactActionAPI,
  getDailyMessageActionAPI,
} from '../actions/DailyFactAPI';

interface DailyMessageState {
  DailyMessageInfo: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DailyMessageState = {
  DailyMessageInfo: [],
  authToken: '',
  status: 'idle',
};

export const getDailyMessageByDateAPI = createAsyncThunk<
  object,
  {state: RootState}
>('fact/fetchDailyMessageInfo', async (data: object, {getState}) => {
  const response = await getDailyMessageActionAPI(data);
  return response.data;
});

export const DailyMessageData = createSlice({
  name: 'fact',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDailyMessageByDateAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getDailyMessageByDateAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.DailyMessageInfo = action.payload;
      })
      .addCase(getDailyMessageByDateAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectDailyMessagetInfo = (state: RootState) =>
  state.DailyMessage.DailyMessageInfo;
export const selectDailyMessageStatus = (state: RootState) =>
  state.DailyMessage.status;

export default DailyMessageData.reducer;
