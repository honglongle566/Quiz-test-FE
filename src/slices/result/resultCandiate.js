import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PAGE_SIZE } from 'slices/core/appState';
import candidateResultDetailApi from 'api/candidateResultDetailApi';

export const reloadData = createAsyncThunk(
  'resultCandiate/reloadData',
  async (id, thunkAPI) => {
    try {
      return candidateResultDetailApi.getResult(id);
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const resultCandiate = createSlice({
  name: 'resultCandiate',
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

const resultCandiateReducer = resultCandiate.reducer;

export const resultCandiateSelector = (state) => state.resultCandiateReducer;

export const {} = resultCandiate.actions;

export default resultCandiateReducer;
