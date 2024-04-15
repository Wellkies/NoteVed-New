import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getChildProbableQuestionDetailsActionAPI} from '../actions/MostProbableAPI';

interface MostProbState {
  MostProb: Object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MostProbState = {
  MostProb: [],
  status: 'idle',
};

export const getChildProbableQuestionDetailsAPI = createAsyncThunk<
  object,
  {state: {MostProbable: MostProbState}}
>('student/fetchProbData', async (data: object, {getState}) => {
  const response = await getChildProbableQuestionDetailsActionAPI(data);

  return response.data;
});

export const MostProbableData = createSlice({
  name: 'MostProb',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getChildProbableQuestionDetailsAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getChildProbableQuestionDetailsAPI.fulfilled,
        (state, action) => {
          state.status = 'idle';
          state.MostProb = action.payload;
        },
      )
      .addCase(getChildProbableQuestionDetailsAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectMostProbableData = (state: RootState) =>
  state.MostProbable.MostProb;
export const selectMostProbableDataStatus = (state: RootState) =>
  state.MostProbable.status;

export default MostProbableData.reducer;
