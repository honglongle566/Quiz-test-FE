import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showAlert, onchangeRouterLink } from 'slices/core/appState';
import examApi from 'api/examApi';
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
        name: currentState.keyword,
        subject_id: currentState.targetSubject || null,
      };
      return Promise.all([
        examApi.getAllPaging({
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
      const test = await examApi.update(item);
      if (test?.status?.status === 407) {
        thunkAPI.dispatch(
          showAlert({ message: 'Lỗi trùng tên', type: 'error' }),
        );
      } else {
        thunkAPI.dispatch(
          showAlert({ message: 'Cập nhật thành công', type: 'success' }),
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
  async (id, thunkAPI) => {
    try {
      await examApi.delete(id);
      thunkAPI.dispatch(
        showAlert({ message: 'Xoá thành công', type: 'success' }),
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
      const newExam = await examApi.create(item);
      thunkAPI.dispatch(
        showAlert({ message: 'Thêm thành công', type: 'success' }),
      );
      thunkAPI.dispatch(hiddenDialog());
      thunkAPI.dispatch(
        onchangeRouterLink(`/tests/${newExam?.data?.id}/create`),
      );
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const initialState = {
  list: [],
  category: [],
  typeSearch: [],
  targetSubject: '',
  isLoading: false,
  keyword: '',
  isDialog: false,
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
    onChangeSubject: (state, action) => {
      state.targetSubject = action.payload.targetSubject;
      state.keyword = action.payload.keyword;
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
      state.list = action.payload[0].data.rows;
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
  destroy,
  onChangeSubject,
} = testIndexSlice.actions;

export default testIndexSlice.reducer;
