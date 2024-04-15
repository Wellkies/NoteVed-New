import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {getBoardAction} from '../actions/StudentBoard';
import {youtubelistApi} from '../actions/YouTubeListApi';

interface YoutubeState {
  youtube: object[]; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: YoutubeState = {
  youtube: [],
  status: 'idle',
};

export const getyoutubelist = createAsyncThunk<{
  state: {YouTubeList: YoutubeState};
}>('Board/fetchyoutube', async (string, {getState}) => {
  const response = await youtubelistApi();
  return response.data;
});

export const YouTubeData = createSlice({
  name: 'youtube',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getyoutubelist.pending, state => {
        state.status = 'loading';
      })
      .addCase(getyoutubelist.fulfilled, (state, action) => {
        state.status = 'idle';
        state.youtube = action.payload;
        // state.StudentBoard.push(action.payload);
      })
      .addCase(getyoutubelist.rejected, (state, action) => {
        state.status = 'failed';
        // You can handle failure here if needed
      });
  },
});

// Export any necessary actions, selectors, and the reducer
export const selectyoutube = (state: RootState) => state.YouTubeList.youtube;
export const selectyoutubeStatus = (state: RootState) =>
  state.YouTubeList.status;

export default YouTubeData.reducer;
