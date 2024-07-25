import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getDailyFactActionAPI} from '../actions/DailyFactAPI';

interface DailyFactState {
  DailyFactInfo: Object[];
  authToken: string;
  visibility: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DailyFactState = {
  DailyFactInfo: [],
  authToken: '',
  visibility: false,
  status: 'idle',
};

export const getDailyFactByDateAPI = createAsyncThunk<
  object,
  {visibility: boolean},
  {state: RootState}
>('fact/fetchDailyFactInfo', async (data: object, {getState}) => {
  const response = await getDailyFactActionAPI();
  return response;
});

export const DailyFactData = createSlice({
  name: 'fact',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDailyFactByDateAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getDailyFactByDateAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.DailyFactInfo = action.payload.data;
        state.visibility = action.payload.visibility;
      })
      .addCase(getDailyFactByDateAPI.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectDailyFactInfo = (state: RootState) =>
  state.DailyFact.DailyFactInfo;
export const selectDailyFactStatus = (state: RootState) =>
  state.DailyFact.status;
export const selectDailyFactVisibility = (state: RootState) =>
  state.DailyFact.visibility;

export default DailyFactData.reducer;
