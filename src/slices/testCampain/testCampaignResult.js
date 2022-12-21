import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PAGE_SIZE } from 'slices/core/appState';
import candidateResultDetailApi from 'api/candidateResultDetailApi';

export const reloadData = createAsyncThunk(
  'testCampaignResult/reloadData',
  async (id, thunkAPI) => {
    try {
      return candidateResultDetailApi.getResult(id);
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const testCampaignResult = createSlice({
  name: 'testCampaignResult',
  initialState: {
    resultData: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [reloadData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [reloadData.fulfilled]: (state, action) => {
      state.resultData = action.payload.data;
      state.isLoading = false;
    },
    [reloadData.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const testCampaignResultReducer = testCampaignResult.reducer;

export const testCampaignResultSelector = (state) =>
  state.testCampaignResultReducer;

export const {} = testCampaignResult.actions;

export default testCampaignResultReducer;
