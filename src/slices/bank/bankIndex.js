import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockup from "mockup/bankList";

export const initData = createAsyncThunk(
  "bankIndex/initData",
  async (_, thunkAPI) => {
    try {
      return mockup;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const reloadData = createAsyncThunk(
  "bankIndex/reloadData",
  async (_, thunkAPI) => {
    try {
      console.log("reloadData");
      const currentState = thunkAPI.getState().bankIndexSliceReducer;
      let params = {
        keyword: currentState.keyword,
        current_page: currentState.pagination.current_page,
      };
      console.log("params", params);
      return mockup;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const bankIndexSlice = createSlice({
  name: "bankIndexSlice",
  initialState: {
    questionGroup: [],
    list: [],
    isLoading: false,
    keyword: "",
    pagination: {
      total_items: 0,
      total_pages: 0,
      current_page: 1,
      rows: 5,
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
    [initData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [initData.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [initData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [reloadData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [reloadData.fulfilled]: (state, action) => {
      state.questionGroup = action.payload?.questionGroup;
      state.list = action.payload?.list;
      state.pagination = action.payload?.pagination;
      state.isLoading = false;
    },
    [reloadData.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const bankIndexSliceReducer = bankIndexSlice.reducer;

export const bankIndexSliceSelector = (state) => state.bankIndexSliceReducer;

export const { changePageNo, onSearch } = bankIndexSlice.actions;

export default bankIndexSliceReducer;
