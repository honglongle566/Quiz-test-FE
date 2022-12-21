import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import statisticalApi from 'api/statisticalApi';

export const reloadData = createAsyncThunk(
  'statisticAll/reloadData',
  async (_, thunkAPI) => {
    try {
      const test = await statisticalApi.getAllPagingTest();
      const testCampain = await statisticalApi.getAllPagingTestCamapain();
      const candiate = await statisticalApi.getAllPagingCandidate();
      return { test, testCampain, candiate };
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const getListCampain = createAsyncThunk(
  'statisticAll/getListCampain',
  async (_, thunkAPI) => {
    try {
      const listTestCamapain = await statisticalApi.getListTestCamapain();
      return listTestCamapain;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const getDashboard = createAsyncThunk(
  'statisticAll/getDashboard',
  async (_, thunkAPI) => {
    try {
      const listTestCamapain = await statisticalApi.getDashboard();
      return listTestCamapain;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const statisticAll = createSlice({
  name: 'statisticAll',
  initialState: {
    test: [],
    testCampain: [],
    candiate: [],
    listTestCamapain: [],
    isLoading: false,
    total_question: 0,
    total_category: 0,
    total_exam_room: 0,
    total_exam: 0,
  },
  reducers: {},
  extraReducers: {
    [reloadData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [reloadData.fulfilled]: (state, action) => {
      state.test = action.payload.test.data;
      state.testCampain = action.payload.testCampain.data;
      state.candiate = action.payload.candiate.data;
      state.isLoading = false;
    },
    [reloadData.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getListCampain.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getListCampain.fulfilled]: (state, action) => {
      state.listTestCamapain = action.payload.data;
      state.isLoading = false;
    },
    [getListCampain.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getDashboard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDashboard.fulfilled]: (state, action) => {
      state.total_question = action.payload.data.total_question || 0;
      state.total_category = action.payload.data.total_category || 0;
      state.total_exam_room = action.payload.data.total_examination_room || 0;
      state.total_exam = action.payload.data.total_exam || 0;
      state.isLoading = false;
    },
    [getDashboard.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const statisticAllReducer = statisticAll.reducer;

export const statisticAllSelector = (state) => state.statisticAllReducer;

export const { changePageNo, onSearch } = statisticAll.actions;

export default statisticAllReducer;
