import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';

interface LanguageState {
  selectedLang: string; // Define UserInfo interface as per your data structure
  status: 'idle' | 'loading' | 'failed';
}

const initialState: LanguageState = {
  selectedLang: 'english',
  status: 'idle',
};

export const StudentLanguage = createSlice({
  name: 'Language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLang = action.payload;
    },
  },
});

export const {setLanguage} = StudentLanguage.actions;
// Export any necessary actions, selectors, and the reducer
export const selectStudentLanguage = (state: RootState) =>
  state.Language.selectedLang;
export const selectStudentLanguageStatus = (state: RootState) =>
  state.Language.status;

export default StudentLanguage.reducer;
