import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getPreviousYearQuestionSetActionAPI} from '../actions/PreviousYearAPI';

interface PreviousQuestionSetState {
  QuestionSET: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PreviousQuestionSetState = {
  QuestionSET: [],
  authToken: '',
  status: 'idle',
};

export const getPreviousYearQuestionSetAPI = createAsyncThunk<
  object,
  {state: {PreviousQuestionSet: PreviousQuestionSetState}}
>('student/fetchPreviousQuestionSET', async (data: object, {getState}) => {
  const response = await getPreviousYearQuestionSetActionAPI(data);

  return response.data;
});

export const PreviousQuestionSetData = createSlice({
  name: 'QuestionSET',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPreviousYearQuestionSetAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPreviousYearQuestionSetAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.QuestionSET = action.payload;
      })
      .addCase(getPreviousYearQuestionSetAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectPreviousQuestionSet = (state: RootState) =>
  state.PreviousQuestionSet.QuestionSET;
export const selectPreviousQuestionSetStatus = (state: RootState) =>
  state.PreviousQuestionSet.status;

export default PreviousQuestionSetData.reducer;
