import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showAlert } from 'slices/core/appState';
import testApi from 'api/examApi';
import categoryApi from 'api/categoryApi';
import { PAGE_SIZE } from 'slices/core/appState';

export const reloadData = createAsyncThunk(
  'testIndex/reloadData',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().testIndexReducer;
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
  'testIndex/updateTest',
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
  'testIndex/removeTest',
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

export const addExam = createAsyncThunk(
  'testIndex/addExam',
  async (item, thunkAPI) => {
    try {
      const exam = await testApi.create(item);
      thunkAPI.dispatch(
        showAlert({ message: 'Them thanh công', type: 'success' }),
      );
      thunkAPI.dispatch(hiddenDialog());
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const initialState = {
  test: [],
  category: [],
  typeSearch: [],
  isLoading: false,
  keyword: '',
  isDialog: false,
  isCreate: false,
  pagination: {
    total_items: 0,
    total_pages: 0,
    current_page: 1,
    rows: 5,
  },
};

const testIndexSlice = createSlice({
  name: 'testIndex',
  initialState,
  reducers: {
    destroy: (state, action) => {
      for (const [key] of Object.entries(state)) {
        state[key] = initialState[key];
      }
    },
    setIsCreate: (state, action) => {
      console.log('setIsCreate');
      state.isCreate = true;
    },
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

    [addExam.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addExam.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addExam.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const testIndexSelector = (state) => state.testIndexReducer;

export const {
  showDialog,
  hiddenDialog,
  onSearch,
  changePageNo,
  setIsCreate,
  destroy,
} = testIndexSlice.actions;

export default testIndexSlice.reducer;
