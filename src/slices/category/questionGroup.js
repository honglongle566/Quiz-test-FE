import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "slices/core/appState";
import mockup from "mockup/questionGroup";

export const initData = createAsyncThunk(
  "questionGroups/initData",
  async (_, thunkAPI) => {
    try {
      console.log("initData");
      return mockup;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const reloadData = createAsyncThunk(
  "questionGroups/reloadData",
  async (_, thunkAPI) => {
    try {
      console.log("reloadData");
      const currentState = thunkAPI.getState().questionGroupReducer;
      let params = {
        keyword: currentState.keyword,
        current_page: currentState.pagination.current_page,
      };
      console.log("params", params);
      return mockup;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const updateQuestionGroup = createAsyncThunk(
  "questionGroups/updateQuestionGroup",
  async (item, thunkAPI) => {
    try {
      console.log("updateQuestionGroup", "id", item);
      thunkAPI.dispatch(
        showAlert({ message: "Cập nhật thanh công", type: "success" })
      );
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log("error", error);
      thunkAPI.dispatch(showAlert({ message: "Lỗi kết nốt", type: "error" }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const removeQuestionGroup = createAsyncThunk(
  "questionGroups/removeQuestionGroup",
  async (item, thunkAPI) => {
    try {
      console.log("removeQuestionGroup", "id", item.id);
      thunkAPI.dispatch(
        showAlert({ message: "Xoá thanh công", type: "success" })
      );
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log("error", error);
      thunkAPI.dispatch(showAlert({ message: "Lỗi kết nốt", type: "error" }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const addQuestionGroup = createAsyncThunk(
  "questionGroups/addQuestionGroup",
  async (item, thunkAPI) => {
    try {
      console.log("addQuestionGroup", item);
      thunkAPI.dispatch(
        showAlert({ message: "Them thanh công", type: "success" })
      );
      thunkAPI.dispatch(hiddenDialog());
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log("error", error);
      thunkAPI.dispatch(showAlert({ message: "Lỗi kết nốt", type: "error" }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const questionGroupsSlice = createSlice({
  name: "questionGroups",
  initialState: {
    questionGroups: [],
    isLoading: false,
    keyword: "",
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
    [initData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [initData.fulfilled]: (state, action) => {
      state.questionGroups = action.payload?.list;
      state.pagination = action.payload?.pagination;
      state.isLoading = false;
    },
    [initData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [reloadData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [reloadData.fulfilled]: (state, action) => {
      state.questionGroups = action.payload?.list;
      state.pagination = action.payload?.pagination;
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
