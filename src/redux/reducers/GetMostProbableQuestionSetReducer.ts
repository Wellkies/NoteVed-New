import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getMostProbableQuestionSetActionAPI} from '../actions/MostProbableAPI';

interface MostProbQsSetState {
  MostProbQsSet: Object[]; // Define UserInfo interface as per your data structure
  authToken: String;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MostProbQsSetState = {
  MostProbQsSet: [],
  authToken: '',
  status: 'idle',
};

export const getMostProbableQuestionSetAPI = createAsyncThunk<
  object,
  {state: {MostProbableQuestionSET: MostProbQsSetState}}
>('student/fetchMostProbablequestionSet', async (data: object, {getState}) => {
  const response = await getMostProbableQuestionSetActionAPI(data);

  return response.data;
});

export const MostProbableQuestionSetData = createSlice({
  name: 'MostProbQsSetState',
  initialState,
  reducers: {
    probstate: state => {
      state.MostProbQsSet = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMostProbableQuestionSetAPI.pending, state => {
        state.status = 'loading';
      })
      .addCase(getMostProbableQuestionSetAPI.fulfilled, (state, action) => {
        state.status = 'idle';
        state.MostProbQsSet = action.payload;
      })
      .addCase(getMostProbableQuestionSetAPI.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectMostProbableQsSetData = (state: RootState) =>
  state.MostProbableQuestionSET.MostProbQsSet;
export const selectMostProbableQsSetStatus = (state: RootState) =>
  state.MostProbableQuestionSET.status;
export const {probstate} = MostProbableQuestionSetData.actions;

export default MostProbableQuestionSetData.reducer;
