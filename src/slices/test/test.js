import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showAlert } from 'slices/core/appState';
import testApi from 'api/testApi';
import categoryApi from 'api/categoryApi';
import { PAGE_SIZE } from 'slices/core/appState';

export const reloadData = createAsyncThunk(
  'test/reloadData',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().TestReducer;
      let params = {
        page_index: currentState.pagination.current_page,
        page_size: PAGE_SIZE,
        keyword: currentState.keyword,
      };
      return Promise.all([
        testApi.getAllPaging({
          params,
        }),
        categoryApi.getAll(),
      ]).then((values) => {
        return values;
      });
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const updateTest = createAsyncThunk(
  'test/updateTest',
  async (item, thunkAPI) => {
    try {
      const test = await testApi.update(item);
      if (test?.status?.status === 407) {
        thunkAPI.dispatch(
          showAlert({ message: 'Lỗi trùng tên', type: 'error' }),
        );
      } else {
        thunkAPI.dispatch(
          showAlert({ message: 'Cập nhật thanh công', type: 'success' }),
        );
      }
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const removeTest = createAsyncThunk(
  'test/removeTest',
  async (item, thunkAPI) => {
    try {
      await testApi.delete(item);
      thunkAPI.dispatch(
        showAlert({ message: 'Xoá thanh công', type: 'success' }),
      );
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const addTest = createAsyncThunk(
  'test/addTest',
  async (item, thunkAPI) => {
    try {
      const test = await testApi.create(item);
      if (test?.status?.status === 407) {
        thunkAPI.dispatch(
          showAlert({ message: 'Lỗi trùng tên', type: 'error' }),
        );
      } else {
        thunkAPI.dispatch(
          showAlert({ message: 'Them thanh công', type: 'success' }),
        );
      }
      thunkAPI.dispatch(hiddenDialog());
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const testSlice = createSlice({
  name: 'test',
  initialState: {
    test: [],
    category: [],
    typeSearch: [],
    isLoading: false,
    keyword: '',
    pagination: {
      total_items: 0,
      total_pages: 0,
      current_page: 1,
      rows: 5,
    },
    isDialog: false,
  },
  reducers: {
    showDialog: (state, action) => {
      state.isDialog = true;
    },
    hiddenDialog: (state, action) => {
      state.isDialog = false;
    },
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
      console.log(action.payload);
      state.test = action.payload[0].data.rows;
      state.pagination.total_items = action.payload[0].data.total_items;
      state.pagination.total_pages = action.payload[0].data.total_pages;
      state.pagination.current_page = action.payload[0].data.current_page;
      state.category = action.payload[1].data;
      state.isLoading = false;
    },
    [reloadData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateTest.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateTest.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateTest.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [removeTest.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeTest.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [removeTest.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addTest.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addTest.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addTest.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const testSelector = (state) => state.TestReducer;

export const { showDialog, hiddenDialog, onSearch, changePageNo } =
  testSlice.actions;

export default testSlice.reducer;
