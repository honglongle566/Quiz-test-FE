import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionApi from "../api/questionApi";
export const PER_PAGE = 2;

export const getQuestions = createAsyncThunk(
    "question/fetched",
    async (query, thunkAPI) => {
        try {
            return await questionApi.getAll(query);
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const addQuestion = createAsyncThunk(
    "question/Added",
    async (data, thunkAPI) => {
        try {
            const response = await questionApi.create(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

const questionSlice = createSlice({
    name: "question",
    initialState: {
        questions: [],
        isLoading: false,
        pagination: {
            current_page: 1,
            total: 0,
            per_page: PER_PAGE,
        },
    },
    reducers: {},
    extraReducers: {
        [getQuestions.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getQuestions.fulfilled]: (state, action) => {
            state.questions = action.payload;
            // state.pagination = action.payload?.pagination;
            // state.isLoading = false;
        },
        [getQuestions.rejected]: (state, action) => {
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

export const questionSelector = (state) => state.questionReducer;

export default questionSlice.reducer;
