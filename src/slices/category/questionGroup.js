import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showAlert } from 'slices/core/appState';
import questionGroupApi from 'api/questionGroupApi';
import { PAGE_SIZE } from 'slices/core/appState';

export const reloadData = createAsyncThunk(
  'questionGroups/reloadData',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().questionGroupReducer;
      let params = {
        page_index: currentState.pagination.current_page,
        page_size: PAGE_SIZE,
        keyword: currentState.keyword,
      };
      return questionGroupApi.getAllPaging({ params });
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const updateQuestionGroup = createAsyncThunk(
  'questionGroups/updateQuestionGroup',
  async (item, thunkAPI) => {
    try {
      const questionGroup = await questionGroupApi.update(item);
      if (questionGroup?.status?.status === 407) {
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

export const removeQuestionGroup = createAsyncThunk(
  'questionGroups/removeQuestionGroup',
  async (item, thunkAPI) => {
    try {
      await questionGroupApi.delete(item);
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

export const addQuestionGroup = createAsyncThunk(
  'questionGroups/addQuestionGroup',
  async (item, thunkAPI) => {
    try {
      const questionGroup = await questionGroupApi.create(item);
      if (questionGroup?.status?.status === 407) {
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

const questionGroupsSlice = createSlice({
  name: 'questionGroups',
  initialState: {
    questionGroups: [],
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
      state.questionGroups = action.payload.data.rows;
      state.pagination.total_items = action.payload.data.total_items;
      state.pagination.total_pages = action.payload.data.total_pages;
      state.pagination.current_page = action.payload.data.current_page;
      state.isLoading = false;
    },
    [reloadData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateQuestionGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateQuestionGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateQuestionGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [removeQuestionGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeQuestionGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [removeQuestionGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addQuestionGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addQuestionGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addQuestionGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const questionGroupsSelector = (state) => state.questionGroupReducer;

export const { showDialog, hiddenDialog, onSearch, changePageNo } =
  questionGroupsSlice.actions;

export default questionGroupsSlice.reducer;
