import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import questionGroupApi from 'api/questionGroupApi';
import questionApi from 'api/questionApi';
import examApi from 'api/examApi';
import { showAlert } from 'slices/core/appState';

export const initData = createAsyncThunk(
  'bankForm/initData',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().bankFormSliceReducer;
      if (
        currentState.isPage === 'CREATE' ||
        currentState.isPage === 'TEST_CREATE_QUESTION'
      ) {
        return questionGroupApi.getAll();
      }
      return Promise.all([
        questionGroupApi.getAll(),
        questionApi.getById(currentState.targetId),
      ]).then((values) => {
        return values;
      });
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const addQuestion = createAsyncThunk(
  'bankForm/addQuestion',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().bankFormSliceReducer;
      if (currentState.isPage === 'CREATE') {
        await questionApi.create(showQuestion(currentState.item));
      } else {
        await examApi.createQuestion(
          currentState.targetTestId,
          showQuestion(currentState.item),
        );
      }
      thunkAPI.dispatch(
        showAlert({ message: 'Thêm thành công', type: 'success' }),
      );
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const updateQuestion = createAsyncThunk(
  'bankForm/updateQuestion',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().bankFormSliceReducer;
      await questionApi.update({
        ...showQuestion(currentState.item),
        id: currentState.targetId,
      });
      thunkAPI.dispatch(
        showAlert({ message: 'Cập nhật thành công', type: 'success' }),
      );
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const getInitQuestion = (data) => {
  if (data.type === 1) {
    return {
      group_question: data.group_question_id,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      answer_mul: data.answer,
      correct_answers_mul: data.correct_answer,
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
      answer_boolean: data.answer,
      correct_answers_boolean: data.correct_answer,
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
      matching_correct_answers: data.matching_correct,
    };
  }
  if (data.type === 4) {
    return {
      group_question: data.group_question_id,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      fill_blank_correct_answers: data.fill_blank_correct_answer,
    };
  }
};

const showQuestion = (data) => {
  if (data.type === 1) {
    return {
      group_question_id: data.group_question,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      answer: data.answer_mul,
      correct_answer: data.correct_answers_mul,
      has_mul_correct_answers: data.correct_answers_mul.length >= 2 ? 1 : 0,
    };
  }
  if (data.type === 2) {
    return {
      group_question_id: data.group_question,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      answer: data.answer_boolean,
      correct_answer: data.correct_answers_boolean,
    };
  }
  if (data.type === 3) {
    return {
      group_question_id: data.group_question,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      matching_answers: data.matching_answers,
      matching_correct: data.matching_correct_answers,
    };
  }
  if (data.type === 4) {
    return {
      group_question_id: data.group_question,
      name: data.name,
      type: data.type,
      note_answer: data.note_answer,
      score: data.score,
      fill_blank_correct_answer: data.fill_blank_correct_answers,
    };
  }
};
const initialState = {
  questionGroup: [],
  targetId: '',
  targetTestId: '',
  isPage: 'CREATE',
  isShowQuestionSpace: false,
  item: {
    group_question: null,
    name: '',
    note_answer: '',
    type: 1,
    score: 1,

    answer_mul: [
      { id: 'a', content: '' },
      { id: 'b', content: '' },
      { id: 'c', content: '' },
      { id: 'd', content: '' },
    ],
    correct_answers_mul: [],
    has_mul_correct_answers: 0,

    answer_boolean: [
      { id: 'a', content: '' },
      { id: 'b', content: '' },
    ],
    correct_answers_boolean: ['a'],

    matching_answers: {
      questions: [
        { id: 1, content: '' },
        { id: 2, content: '' },
      ],
      answers: [
        { id: 'a', content: '' },
        { id: 'b', content: '' },
      ],
    },
    matching_correct_answers: {
      1: [],
      2: [],
    },

    fill_blank_correct_answers: [],
  },
};

const bankFormSlice = createSlice({
  name: 'bankFormSlice',
  initialState: { ...initialState },
  reducers: {
    destroy: (state, action) => {
      for (const [key] of Object.entries(state)) {
        state[key] = initialState[key];
      }
    },
    setIsShowQuestionSpace: (state, action) => {
      state.isShowQuestionSpace = action.payload;
    },
    setIsPage: (state, action) => {
      state.isPage = action.payload;
    },
    setTargetId: (state, action) => {
      state.targetId = action.payload;
    },
    setTargetTestId: (state, action) => {
      state.targetTestId = action.payload;
    },
    setType: (state, action) => {
      state.item.type = action.payload;
    },
    setName: (state, action) => {
      state.item.name = action.payload;
    },
    setNoteAnswer: (state, action) => {
      state.item.note_answer = action.payload;
    },
    setScore: (state, action) => {
      state.item.score = action.payload;
    },
    setGroupQuestion: (state, action) => {
      state.item.group_question = action.payload;
    },
    setAnswerMul: (state, action) => {
      state.item.answer_mul = action.payload;
    },
    setCorrectAnswersMul: (state, action) => {
      state.item.correct_answers_mul = action.payload;
    },
    setHasMulCorrectAnswers: (state, action) => {
      state.item.has_mul_correct_answers = action.payload;
    },
    setAnswerBoolean: (state, action) => {
      state.item.answer_boolean = action.payload;
    },
    setCorrectAnswersBoolean: (state, action) => {
      state.item.correct_answers_boolean = action.payload;
    },
    setMatchingAnswers: (state, action) => {
      state.item.matching_answers = action.payload;
    },
    setMatchingCorrectAnswers: (state, action) => {
      state.item.matching_correct_answers = action.payload;
    },
    setFillBlankCorrectAnswers: (state, action) => {
      state.item.fill_blank_correct_answers = action.payload;
    },
  },
  extraReducers: {
    [initData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [initData.fulfilled]: (state, action) => {
      if (
        state.isPage === 'CREATE' ||
        state.isPage === 'TEST_CREATE_QUESTION'
      ) {
        state.questionGroup = action.payload.data;
      } else {
        state.questionGroup = action.payload[0].data;
        state.item = {
          ...initialState.item,
          ...getInitQuestion(action.payload[1].data),
        };
        if (state.item.type === 4) {
          state.isShowQuestionSpace = true;
        }
      }
      state.isLoading = false;
    },
    [initData.rejected]: (state, action) => {
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

    [updateQuestion.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateQuestion.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateQuestion.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const bankFormSliceReducer = bankFormSlice.reducer;

export const bankFormSliceSelector = (state) => state.bankFormSliceReducer;

export const {
  destroy,
  setTargetTestId,
  setIsPage,
  setIsShowQuestionSpace,
  setTargetId,
  setType,
  setName,
  setNoteAnswer,
  setAnswerMul,
  setScore,
  setGroupQuestion,
  setCorrectAnswersMul,
  setHasMulCorrectAnswers,
  setAnswerBoolean,
  setCorrectAnswersBoolean,
  setMatchingAnswers,
  setMatchingCorrectAnswers,
  setFillBlankCorrectAnswers,
} = bankFormSlice.actions;

export default bankFormSliceReducer;
