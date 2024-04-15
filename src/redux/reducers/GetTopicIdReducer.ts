import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';

interface TopicIdState {
  TopicId: string; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TopicIdState = {
  TopicId: 'odia',
  status: 'idle',
};


export const TopicIdData = createSlice({
  name: 'TopicIdData',
  initialState,
  reducers: {
    handleSetTopicIdForRevision: (state, action) => {
      state.TopicId = action.payload;
    },
  },
});

export const {handleSetTopicIdForRevision} = TopicIdData.actions;
// Export any necessary actions, selectors, and the reducer
export const selectTopicId = (state: RootState) =>
  state.SelectedTopic.TopicId;
export const selectTopicIdStatus = (state: RootState) =>
  state.SelectedTopic.status;

export default TopicIdData.reducer;
