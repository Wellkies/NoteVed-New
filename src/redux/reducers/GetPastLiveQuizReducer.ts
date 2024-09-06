import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getPastLiveQuizAPIAction} from '../actions/LiveQuizAPI';

interface PastLiveQuizState {
  PastLiveQuiz: Object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PastLiveQuizState = {
  PastLiveQuiz: [],
  status: 'idle',
};

// export const getPastLiveQuizAPI = createAsyncThunk<object, { state: RootState }>(
//   "PastLiveQuiz/fetchPastLiveQuizData",
//   async (string, { getState }) => {
//     const response = await getPastLiveQuizAPIAction();
//     // Storage.storeObject('SubID', data.subjectid);
//     return response.data;
//   }
// );
export const getPastLiveQuizAPI = createAsyncThunk<{
  state: {PastLiveQuizState: PastLiveQuizState};
}>('PastLiveQuiz/fetchPastLiveQuizData', async (string, {getState}) => {
  const response = await getPastLiveQuizAPIAction();
  return response.data;
});

export const PastLiveQuizData = createSlice({
  name: 'PastLiveQuiz',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPastLiveQuizAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPastLiveQuizAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.PastLiveQuiz = action.payload;
      })
      .addCase(getPastLiveQuizAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectPastLiveQuizData = (state: RootState) =>
  state.PastLiveQuizList.PastLiveQuiz;
export const selectPastLiveQuizStatus = (state: RootState) =>
  state.PastLiveQuizList.status;

export default PastLiveQuizData.reducer;
