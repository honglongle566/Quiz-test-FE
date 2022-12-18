import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PAGE_SIZE } from 'slices/core/appState';
import examRoomApi from 'api/examRoomApi';
import { showAlert } from 'slices/core/appState';

export const reloadData = createAsyncThunk(
  'testCampaignIndex/reloadData',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().testCampaignIndexReducer;
      let params = {
        page_index: currentState.pagination.current_page,
        page_size: PAGE_SIZE,
        name: currentState.keyword || null,
      };
      return examRoomApi.getAllPaging({ params });
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const testCampaignIndex = createSlice({
  name: 'testCampaignIndex',
  initialState: {
    list: [],
    isLoading: false,
    keyword: '',
    pagination: {
      total_items: 0,
      total_pages: 0,
      current_page: 1,
      rows: PAGE_SIZE,
    },
  },
  reducers: {
    changePageNo: (state, action) => {
      state.pagination.current_page = action.payload;
    },
    onSearch: (state, action) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: {
    [reloadData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [reloadData.fulfilled]: (state, action) => {
      state.list = action.payload.data.rows;
      state.pagination.total_items = action.payload.data.total_items;
      state.pagination.total_pages = action.payload.data.total_pages;
      state.pagination.current_page = action.payload.data.current_page;
      state.isLoading = false;
    },
    [reloadData.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const testCampaignIndexReducer = testCampaignIndex.reducer;

export const testCampaignIndexSelector = (state) =>
  state.testCampaignIndexReducer;

export const { changePageNo, onSearch } = testCampaignIndex.actions;

export default testCampaignIndexReducer;
