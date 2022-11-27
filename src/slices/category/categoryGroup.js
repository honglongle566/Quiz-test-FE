import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showAlert } from 'slices/core/appState';
import categoryApi from 'api/categoryApi';
import subjectApi from 'api/subjectApi';
import { PAGE_SIZE } from 'slices/core/appState';

export const reloadData = createAsyncThunk(
  'categoryGroup/reloadData',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().categoryGroupReducer;
      let params = {
        page_index: currentState.pagination.current_page,
        page_size: PAGE_SIZE,
        keyword: currentState.keyword,
      };

      return Promise.all([
        categoryApi.getAll(),
        categoryApi.getAllPaging({
          params,
        }),
      ]).then((values) => {
        return values;
      });
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const updateCategoryGroup = createAsyncThunk(
  'categoryGroup/updateCategoryGroup',
  async (item, thunkAPI) => {
    try {
      const category = await categoryApi.update(item);
      if (category?.status?.status === 407) {
        thunkAPI.dispatch(
          showAlert({ message: 'Lỗi trùng tên', type: 'error' }),
        );
      } else {
        thunkAPI.dispatch(
          showAlert({ message: 'Cập nhật thanh công', type: 'success' }),
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

export const updateSubject = createAsyncThunk(
  'categoryGroup/updateSubject',
  async (item, thunkAPI) => {
    try {
      const subject = await subjectApi.update(item);
      if (subject?.status?.status === 407) {
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

export const removeCategoryGroup = createAsyncThunk(
  'categoryGroup/removeCategoryGroup',
  async (item, thunkAPI) => {
    try {
      await categoryApi.delete(item);
      thunkAPI.dispatch(
        showAlert({ message: 'Xoá thanh công', type: 'success' }),
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
export const removeSubject = createAsyncThunk(
  'categoryGroup/removeSubject',
  async (item, thunkAPI) => {
    try {
      await subjectApi.delete(item);
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

export const addCategoryGroup = createAsyncThunk(
  'categoryGroup/addCategoryGroup',
  async (item, thunkAPI) => {
    try {
      const subject = await subjectApi.createAll(item);
      if (subject?.status?.status === 407) {
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

export const addSubject = createAsyncThunk(
  'categoryGroup/addSubject',
  async (item, thunkAPI) => {
    try {
      const subject = await subjectApi.create(item);
      if (subject?.status?.status === 407) {
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

export const moveSubject = createAsyncThunk(
  'categoryGroup/moveSubject',
  async (item, thunkAPI) => {
    try {
      const subject = await subjectApi.move(item);
      if (subject?.status?.status === 407) {
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

const categoryGroupSlice = createSlice({
  name: 'categoryGroup',
  initialState: {
    categoryGroup: [],
    categoryGroupAll: [],
    isLoading: false,
    keyword: '',
    pagination: {
      total_items: 0,
      total_pages: 0,
      current_page: 1,
      pageSize: PAGE_SIZE,
    },
    isDialog: false,
    typeDialog: '',
    targetItem: '',
    targetSubject: '',
  },
  reducers: {
    showDialog: (state, action) => {
      state.isDialog = true;
      state.typeDialog = action.payload.type;
      state.targetItem = action.payload?.item;
      state.targetSubject = action.payload?.subject;
    },
    hiddenDialog: (state, action) => {
      state.isDialog = false;
      state.typeDialog = '';
      state.targetItem = '';
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
      state.categoryGroupAll = action.payload[0].data;
      state.categoryGroup = action.payload[1].data.rows;
      state.pagination.total_items = action.payload[1].data.total_items;
      state.pagination.total_pages = action.payload[1].data.total_pages;
      state.pagination.current_page = action.payload[1].data.current_page;
      state.isLoading = false;
    },
    [reloadData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateCategoryGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateCategoryGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateCategoryGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [removeCategoryGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeCategoryGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [removeCategoryGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [removeSubject.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeSubject.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [removeSubject.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addCategoryGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addCategoryGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addCategoryGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addSubject.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addSubject.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addSubject.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [moveSubject.pending]: (state, action) => {
      state.isLoading = true;
    },
    [moveSubject.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [moveSubject.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateSubject.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateSubject.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateSubject.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const categoryGroupSelector = (state) => state.categoryGroupReducer;

export const { showDialog, hiddenDialog, onSearch, changePageNo } =
  categoryGroupSlice.actions;

export default categoryGroupSlice.reducer;
