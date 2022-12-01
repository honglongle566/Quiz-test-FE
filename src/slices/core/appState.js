import { createSlice } from '@reduxjs/toolkit';
export const LANGUAGE_VI = 'vi';
export const LANGUAGE_EN = 'en';
export const PAGE_SIZE = 10;
export const PAGE_SIZE_MAX = 9999;

const appState = createSlice({
  name: 'appState',
  initialState: {
    language: localStorage['i18nextLng'] || LANGUAGE_VI,
    alert: {
      type: '',
      message: '',
    },
  },
  reducers: {
    changeLocales: (state, action) => {
      state.language = action.payload;
    },
    showAlert: (state, action) => {
      state.alert.type = action.payload.type;
      state.alert.message = action.payload.message;
    },
    hideAlert: (state, action) => {
      state.alert.type = '';
      state.alert.message = '';
    },
  },
});

const appStateReducer = appState.reducer;

export const appStateSelector = (state) => state.appStateReducer;

export const { changeLocales, showAlert, hideAlert } = appState.actions;

export default appStateReducer;
