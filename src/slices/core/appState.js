import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
export const LANGUAGE_VI = 'vi';
export const LANGUAGE_EN = 'en';
export const PAGE_SIZE = 10;
export const PAGE_SIZE_MAX = 9999;
export const LOCAL_STORAGE_TOKEN_NAME = 'token-name';

export const loadUser = createAsyncThunk(
  'appState/loadUser',
  async (_, thunkAPI) => {
    try {
      const auth = await authApi.getAuth();
      if (auth?.status === 401) {
        return thunkAPI.rejectWithValue(auth.error.toString());
      }
      return auth;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const loginUser = createAsyncThunk(
  'appState/loginUser',
  async (userForm, thunkAPI) => {
    try {
      const response = await authApi.login(userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken,
        );
        thunkAPI.dispatch(loadUser());
      }
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const registerUser = createAsyncThunk(
  'appState/registerUser',
  async (userForm, thunkAPI) => {
    try {
      const response = await authApi.register(userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken,
        );
        thunkAPI.dispatch(loadUser());
      }
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const appState = createSlice({
  name: 'appState',
  initialState: {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    language: localStorage['i18nextLng'] || LANGUAGE_VI,
    alert: {
      type: '',
      message: '',
    },
    routerLink: '',
  },
  reducers: {
    logoutUser: (state, action) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      state.isAuthenticated = false;
      state.user = null;
    },
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
    onchangeRouterLink: (state, action) => {
      state.routerLink = action.payload;
    },
  },
  extraReducers: {
    [loadUser.pending]: (state, action) => {
      state.authLoading = true;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.authLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
    },
    [loadUser.rejected]: (state, action) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      state.isAuthenticated = false;
      state.user = null;
      state.authLoading = false;
    },

    [loginUser.pending]: (state, action) => {
      state.authLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.authLoading = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.authLoading = false;
    },

    [registerUser.pending]: (state, action) => {
      state.authLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.authLoading = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.authLoading = false;
    },
  },
});

const appStateReducer = appState.reducer;

export const appStateSelector = (state) => state.appStateReducer;

export const {
  changeLocales,
  showAlert,
  hideAlert,
  onchangeRouterLink,
  logoutUser,
} = appState.actions;

export default appStateReducer;
