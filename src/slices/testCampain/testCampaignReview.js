import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import examRoomApi from 'api/examRoomApi';
import { setDataEdit } from './testCampaignForm';
import { PAGE_SIZE_MAX, onchangeRouterLink } from 'slices/core/appState';
import { showAlert } from 'slices/core/appState';

export const reloadData = createAsyncThunk(
  'testCampaignReview/reloadData',
  async (id, thunkAPI) => {
    try {
      const examRoom = await examRoomApi.getById(id);
      thunkAPI.dispatch(setDataEdit(examRoom.data));
      return examRoom;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const updateTestCampaign = createAsyncThunk(
  'testCampaignForm/updateTestCampaign',
  async (_, thunkAPI) => {
    try {
      const currentStateForm = thunkAPI.getState().testCampaignFormReducer;
      const currentStateReview = thunkAPI.getState().testCampaignReviewReducer;
      const examRoom = await examRoomApi.update({
        ...convertDataRoom(currentStateForm.item, currentStateForm.requireInfo),
        id: currentStateReview.test.id,
      });
      thunkAPI.dispatch(
        showAlert({ message: 'Them thanh công', type: 'success' }),
      );
      thunkAPI.dispatch(onchangeRouterLink(`/test-campaigns`));
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

const convertDataRoom = (item, requireInfo) => {
  let newData = {};
  for (let i = 0; i < requireInfo.length; i++) {
    if (requireInfo[i] === 0) {
      newData.is_require_full_name = 1;
    }
    if (requireInfo[i] === 1) {
      newData.is_require_email = 1;
    }
    if (requireInfo[i] === 2) {
      newData.is_require_phone = 1;
    }
    if (requireInfo[i] === 3) {
      newData.is_require_group = 1;
    }
    if (requireInfo[i] === 4) {
      newData.is_require_identify_code = 1;
    }
  }
  return { ...item, ...newData };
};

const testCampaignReview = createSlice({
  name: 'testCampaignReview',
  initialState: {
    test: [],
    isLoading: false,
    keyword: '',
  },
  reducers: {},
  extraReducers: {
    [reloadData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [reloadData.fulfilled]: (state, action) => {
      state.test = action.payload.data;
      state.isLoading = false;
    },
    [reloadData.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateTestCampaign.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateTestCampaign.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateTestCampaign.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const testCampaignReviewReducer = testCampaignReview.reducer;

export const testCampaignReviewSelector = (state) =>
  state.testCampaignReviewReducer;

export const {} = testCampaignReview.actions;

export default testCampaignReviewReducer;
