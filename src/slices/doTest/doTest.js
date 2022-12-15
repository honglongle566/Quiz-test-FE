import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showAlert, onchangeRouterLink } from 'slices/core/appState';
import examRoomApi from 'api/examRoomApi';
import candidateApi from 'api/candidateApi';
import { convertToPlain } from 'utils/utils';
import { LOCAL_STORAGE_ANSWER } from 'slices/core/appState';

export const infoCollect = createAsyncThunk(
  'doTest/infoCollect',
  async (id, thunkAPI) => {
    try {
      thunkAPI.dispatch(setTargetId(id));
      const examRoom = await examRoomApi.getInfoCollect(id);
      if (examRoom?.data?.code_room) {
        thunkAPI.dispatch(
          onchangeRouterLink(`info-collect/${id}/join-access-code`),
        );
      } else {
        thunkAPI.dispatch(onchangeRouterLink(`info-collect/${id}/info`));
      }
      return examRoom;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const registerCandidate = createAsyncThunk(
  'doTest/registerCandidate',
  async (data, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().doTestReducer;
      const candidate = await candidateApi.create({
        ...data,
        examination_room_id: currentState.examRoom.id,
        exam_id: currentState.examRoom.exam_id,
      });
      if (candidate.data.success) {
        thunkAPI.dispatch(
          onchangeRouterLink(`do-test/${currentState.targetId}/guide`),
        );
      }
      return candidate;
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const submitTheExam = createAsyncThunk(
  'doTest/submitTheExam',
  async (data, thunkAPI) => {
    try {
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const joinTest = createAsyncThunk(
  'doTest/joinTest',
  async (data, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().doTestReducer;
      if (currentState.examRoom.code_room === data.code_room) {
        thunkAPI.dispatch(
          onchangeRouterLink(`info-collect/${currentState.targetId}/info`),
        );
      } else {
        thunkAPI.dispatch(
          showAlert({ message: 'Mã truy cập không chính xác', type: 'error' }),
        );
      }
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const startDoingExam = createAsyncThunk(
  'doTest/startDoingExam',
  async (data, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().doTestReducer;
      const examRoom = await examRoomApi.getExamQuestion(currentState.targetId);
      if (examRoom?.success)
        thunkAPI.dispatch(
          onchangeRouterLink(`do-test/${currentState.targetId}/exam-question`),
        );
      return examRoom;
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);
export const getExamQuestion = createAsyncThunk(
  'doTest/getExamQuestion',
  async (data, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().doTestReducer;
      const examRoom = await examRoomApi.getExamQuestion(currentState.targetId);
      return examRoom;
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const initialState = {
  targetId: '',
  examRoom: {},
  candidate: {},
  questions: [],
  listQuestion: [],
  listAnswers: {},
  isAccessCode: false,
  isLoading: false,
};

const doTestSlice = createSlice({
  name: 'doTest',
  initialState,
  reducers: {
    destroy: (state, action) => {
      for (const [key] of Object.entries(state)) {
        state[key] = initialState[key];
      }
    },
    setTargetId: (state, action) => {
      state.targetId = action.payload;
    },
    updateListAnswer: (state, action) => {
      state.listAnswers = {
        ...state.listAnswers,
        [action.payload.index]: action.payload.answer,
      };
      localStorage.setItem(
        LOCAL_STORAGE_ANSWER,
        JSON.stringify(state.listAnswers),
      );
    },
  },
  extraReducers: {
    [infoCollect.pending]: (state, action) => {
      state.isLoading = true;
    },
    [infoCollect.fulfilled]: (state, action) => {
      state.examRoom = action.payload.data;
      state.isLoading = false;
    },
    [infoCollect.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [registerCandidate.pending]: (state, action) => {
      state.isLoading = true;
    },
    [registerCandidate.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [registerCandidate.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [submitTheExam.pending]: (state, action) => {
      state.isLoading = true;
    },
    [submitTheExam.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [submitTheExam.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [startDoingExam.pending]: (state, action) => {
      state.isLoading = true;
    },
    [startDoingExam.fulfilled]: (state, action) => {
      state.examRoom = action.payload.data.exam_room;
      state.questions = action.payload.data.questions;
      state.listQuestion = action.payload.data.list_question.map((item) => ({
        ...item,
        name: convertToPlain(item.name),
      }));
      state.isLoading = false;
    },
    [startDoingExam.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getExamQuestion.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getExamQuestion.fulfilled]: (state, action) => {
      state.examRoom = action.payload.data.exam_room;
      state.questions = action.payload.data.questions;
      state.listQuestion = action.payload.data.list_question.map((item) => ({
        ...item,
        name: convertToPlain(item.name),
      }));
      state.isLoading = false;
      state.listAnswers =
        JSON.parse(localStorage[LOCAL_STORAGE_ANSWER] || null) || {};
    },
    [getExamQuestion.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const doTestSelector = (state) => state.doTestReducer;

export const { destroy, setTargetId, updateListAnswer } = doTestSlice.actions;

export default doTestSlice.reducer;
