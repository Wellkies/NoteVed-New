import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getBoardAction} from '../actions/StudentBoard';

interface BoardState {
  StudentBoard: object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BoardState = {
  StudentBoard: [],
  status: 'idle',
};

export const getBoard = createAsyncThunk<{state: {Board: BoardState}}>(
  'Board/fetchStudentBoard',
  async (string, {getState}) => {
    const response = await getBoardAction();
    return response.data;
  },
);

export const StudentBoardData = createSlice({
  name: 'Board',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBoard.pending, state => {
        state.status = 'loading';
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.status = 'idle';
        state.StudentBoard=action.payload;
        // state.StudentBoard.push(action.payload);

      })
      .addCase(getBoard.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectStudentBoard = (state: RootState) =>
  state.Board.StudentBoard;
export const selectStudentBoardStatus = (state: RootState) =>
  state.Board.status;

export default StudentBoardData.reducer;
