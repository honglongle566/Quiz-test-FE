import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PAGE_SIZE } from 'slices/core/appState';
import questionApi from 'api/questionApi';
import questionGroupApi from 'api/questionGroupApi';
import examApi from 'api/examApi';
import { showAlert } from 'slices/core/appState';

export const reloadData = createAsyncThunk(
  'bankIndex/reloadData',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().bankIndexSliceReducer;
      let params = {
        page_index: currentState.pagination.current_page,
        page_size: PAGE_SIZE,
        name: currentState.keyword || null,
        group_question_id: currentState.targetGroupQuestion || null,
      };
      if (currentState.isPage === 'CREATE')
        return Promise.all([
          questionGroupApi.getAll(),
          questionApi.getAllPaging({
            params,
          }),
          examApi.getById(currentState.targetExamId),
        ]).then((values) => {
          return values;
        });
      else {
        return Promise.all([
          questionGroupApi.getAll(),
          questionApi.getAllPaging({
            params,
          }),
        ]).then((values) => {
          return values;
        });
      }
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const duplicateQuestion = createAsyncThunk(
  'bankForm/duplicateQuestion',
  async (data, thunkAPI) => {
    try {
      console.log('data', data);
      await questionApi.create(getDuplicateQuestion(data));
      thunkAPI.dispatch(
        showAlert({ message: 'Nhân bản thành công', type: 'success' }),
      );
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);
export const addQuestionsToExam = createAsyncThunk(
  'bankForm/addQuestionsToExam',
  async (id, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().bankIndexSliceReducer;
      await examApi.addQuestionsToExam(currentState.targetExamId, {
        questions: [id],
      });
      thunkAPI.dispatch(
        showAlert({ message: 'Thêm thành công', type: 'success' }),
      );
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const removeQuestionsToExam = createAsyncThunk(
  'bankForm/removeQuestionsToExam',
  async (id, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().bankIndexSliceReducer;
      await examApi.removeQuestionsToExam(currentState.targetExamId, {
        questions: [id],
      });
      thunkAPI.dispatch(
        showAlert({ message: 'Xoa thanh công', type: 'success' }),
      );
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const getDuplicateQuestion = (data) => {
  if (data.type === 1) {
    return {
      group_question: data.group_question_id,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      answer: data.answer,
      correct_answer: data.correct_answer,
      has_mul_correct_answers: data.has_mul_correct_answers,
    };
  }
  if (data.type === 2) {
    return {
      group_question: data.group_question_id,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      answer: data.answer,
      correct_answer: data.correct_answer,
    };
  }
  if (data.type === 3) {
    return {
      group_question: data.group_question_id,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      matching_answers: data.matching_answers,
      matching_correct: data.matching_correct,
    };
  }
  if (data.type === 4) {
    return {
      group_question: data.group_question_id,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      fill_blank_correct_answer: data.fill_blank_correct_answer,
    };
  }
};

export const removeQuestion = createAsyncThunk(
  'bankIndex/removeQuestion',
  async (item, thunkAPI) => {
    try {
      await questionApi.delete(item);
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

const bankIndexSlice = createSlice({
  name: 'bankIndexSlice',
  initialState: {
    questionChecked: [],
    questionGroup: [],
    list: [],
    isLoading: false,
    keyword: '',
    isPage: 'INDEX',
    targetExamId: '',
    targetGroupQuestion: null,
    pagination: {
      total_items: 0,
      total_pages: 0,
      current_page: 1,
      rows: PAGE_SIZE,
    },
  },
  reducers: {
    setTargetExamId: (state, action) => {
      state.targetExamId = action.payload;
    },
    changePageNo: (state, action) => {
      state.pagination.current_page = action.payload;
    },
    setIsPage: (state, action) => {
      state.isPage = action.payload;
    },
    onSearch: (state, action) => {
      state.keyword = action.payload;
    },
    onChangeGroupQuestion: (state, action) => {
      state.targetGroupQuestion = action.payload.targetGroupQuestion;
      state.keyword = action.payload.keyword;
    },
  },
  extraReducers: {
    [reloadData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [reloadData.fulfilled]: (state, action) => {
      state.questionGroup = action.payload[0].data;
      state.list = action.payload[1].data.rows;
      state.pagination.total_items = action.payload[1].data.total_items;
      state.pagination.total_pages = action.payload[1].data.total_pages;
      state.pagination.current_page = action.payload[1].data.current_page;
      if (state.isPage === 'CREATE') {
        state.questionChecked = action.payload[2].data.question || [];
      }
      state.isLoading = false;
    },
    [reloadData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [removeQuestion.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeQuestion.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [removeQuestion.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [duplicateQuestion.pending]: (state, action) => {
      state.isLoading = true;
    },
    [duplicateQuestion.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [duplicateQuestion.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addQuestionsToExam.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addQuestionsToExam.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addQuestionsToExam.rejected]: (state, action) => {
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
  },
});

const bankIndexSliceReducer = bankIndexSlice.reducer;

export const bankIndexSliceSelector = (state) => state.bankIndexSliceReducer;

export const {
  changePageNo,
  onSearch,
  onChangeGroupQuestion,
  setIsPage,
  setTargetExamId,
} = bankIndexSlice.actions;

export default bankIndexSliceReducer;
