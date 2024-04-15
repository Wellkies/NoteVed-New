import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import { getLiveclassAction } from '../actions/GetLiveClassDetails';

interface LiveclassState {
  Liveclass: Object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: LiveclassState = {
  Liveclass: [],
  status: 'idle',
};

export const getLiveclassAPI = createAsyncThunk<
  object,
  {state: {LiveClassList: LiveclassState}}
>('student/fetchLiveClassData', async (data: object, {getState}) => {
  const response = await getLiveclassAction(data);

  return response.data;
});

export const LiveclassData = createSlice({
  name: 'Liveclass',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLiveclassAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getLiveclassAPI.fulfilled,
        (state, action) => {
          state.status = 'idle';
          state.Liveclass = action.payload;
        },
      )
      .addCase(getLiveclassAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectLiveClassData = (state: RootState) =>
  state.LiveClassList.Liveclass;
export const selectMostLiveClassStatus = (state: RootState) =>
  state.LiveClassList.status;

export default LiveclassData.reducer;
