import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockup from "mockup/bankForm";

export const initData = createAsyncThunk(
  "bankForm/initData",
  async (_, thunkAPI) => {
    try {
      return mockup;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const bankFormSlice = createSlice({
  name: "bankFormSlice",
  initialState: {
    questionGroup: [],
    item: {
      group_question: 2,
      name: "<p>cd</p>",
      note_answer: "<p><strong>chu thich</strong></p>",
      type: 1,
      score: 1,

      answer_mul: [
        { id: "a", content: "<p>a</p>" },
        { id: "b", content: "<p>b</p>" },
        { id: "c", content: "<p>123</p>" },
        { id: "d", content: "<p>323</p>" },
        { id: "e", content: "<p>12</p>" },
      ],
      correct_answers_mul: ["a", "b"],
      has_mul_correct_answers: true,

      answer_boolean: [
        { id: "a", content: "<p>a</p>" },
        { id: "b", content: "<p>b</p>" },
      ],
      correct_answers_boolean: ["b"],

      matching_answers: {
        questions: [
          { id: 1, content: "<p>1</p>" },
          { id: 2, content: "<p>2</p>" },
          { id: 3, content: "<p>f</p>" },
        ],
        answers: [
          { id: "a", content: "<p>1</p>" },
          { id: "b", content: "<p>2</p>" },
        ],
      },
      matching_correct_answers: { 1: ["a"], 2: ["b"], 3: ["a"] },

      fill_blank_correct_answers: [
        { key: 1, content: "son" },
        { key: 2, content: "Nghia me" },
      ],
    },
  },
  reducers: {
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
      state.item = action.payload?.item;
      state.questionGroup = action.payload?.questionGroup;
      state.isLoading = false;
    },
    [initData.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const bankFormSliceReducer = bankFormSlice.reducer;

export const bankFormSliceSelector = (state) => state.bankFormSliceReducer;

export const {
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
