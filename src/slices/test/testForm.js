import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showAlert } from 'slices/core/appState';
import examApi from 'api/examApi';
import questionApi from 'api/questionApi';
import categoryApi from 'api/categoryApi';
import { PAGE_SIZE_MAX, onchangeRouterLink } from 'slices/core/appState';

export const reloadData = createAsyncThunk(
  'testForm/reloadData',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().testFormReducer;
      let params = {
        page_index: 1,
        page_size: PAGE_SIZE_MAX,
        exam_id: currentState.targetExam,
      };
      return Promise.all([
        examApi.getById(currentState.targetExam),
        categoryApi.getAll(),
        questionApi.getAllPaging({
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

export const updateTest = createAsyncThunk(
  'testForm/updateTest',
  async (item, thunkAPI) => {
    try {
      await examApi.update(item);
      thunkAPI.dispatch(
        showAlert({ message: 'Cập nhật thanh công', type: 'success' }),
      );
      thunkAPI.dispatch(hiddenDialog());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const removeQuestionsToExam = createAsyncThunk(
  'testForm/removeQuestionsToExam',
  async (id, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().testFormReducer;
      await examApi.removeQuestionsToExam(currentState.targetExam, {
        questions: [id],
      });
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

export const addQuestion = createAsyncThunk(
  'testForm/addQuestion',
  async (item, thunkAPI) => {
    try {
      let newItem = { ...item };
      delete newItem.created_by;
      delete newItem.creted_date;
      delete newItem.updated_by;
      delete newItem.updated_date;
      delete newItem.user_id;
      delete newItem.id;
      const currentState = thunkAPI.getState().testFormReducer;
      const newQuestion = await examApi.createQuestion(
        currentState.targetExam,
        newItem,
      );
      if (!newQuestion.code) {
        thunkAPI.dispatch(
          showAlert({ message: 'Copy thanh công', type: 'success' }),
        );
        thunkAPI.dispatch(reloadData());
        thunkAPI.dispatch(
          onchangeRouterLink(`bank/question/${newQuestion.data.id}/edit`),
        );
      } else {
        thunkAPI.dispatch(
          showAlert({ message: 'Copy không thanh công', type: 'success' }),
        );
      }
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const initialState = {
  test: {},
  list: [],
  category: [],
  targetExam: '',
  isLoading: false,
  keyword: '',
  isDialog: false,
};

const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    destroy: (state, action) => {
      for (const [key] of Object.entries(state)) {
        state[key] = initialState[key];
      }
    },
    setTargetExam: (state, action) => {
      state.targetExam = action.payload;
    },
    showDialog: (state, action) => {
      state.isDialog = true;
    },
    hiddenDialog: (state, action) => {
      state.isDialog = false;
    },
  },
  extraReducers: {
    [reloadData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [reloadData.fulfilled]: (state, action) => {
      state.test = action.payload[0].data;
      state.category = action.payload[1].data;
      state.list = action.payload[2].data.rows;
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

    [removeQuestionsToExam.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeQuestionsToExam.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [removeQuestionsToExam.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addQuestion.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addQuestion.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addQuestion.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const testFormSelector = (state) => state.testFormReducer;

export const { showDialog, hiddenDialog, destroy, setTargetExam } =
  testFormSlice.actions;

export default testFormSlice.reducer;
