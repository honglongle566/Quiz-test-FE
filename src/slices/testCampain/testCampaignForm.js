import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showAlert } from 'slices/core/appState';
import examRoomApi from 'api/examRoomApi';
import examApi from 'api/examApi';
import categoryApi from 'api/categoryApi';
import { PAGE_SIZE_MAX, onchangeRouterLink } from 'slices/core/appState';

export const reloadData = createAsyncThunk(
  'testCampaignForm/reloadData',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().testCampaignFormReducer;
      let params = {
        name: currentState.keyword,
        subject_id: currentState.targetSubject || null,
        page_index: 1,
        page_size: PAGE_SIZE_MAX,
      };
      return Promise.all([
        examApi.getAllPaging({ params }),
        categoryApi.getAll(),
      ]).then((values) => {
        return values;
      });
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const updateTestCampaign = createAsyncThunk(
  'testCampaignForm/updateTestCampaign',
  async (item, thunkAPI) => {
    try {
      await examRoomApi.update(item);
      thunkAPI.dispatch(
        showAlert({ message: 'Cập nhật thanh công', type: 'success' }),
      );
      thunkAPI.dispatch(reloadData());
    } catch (error) {
      console.log('error', error);
      thunkAPI.dispatch(showAlert({ message: 'Lỗi kết nốt', type: 'error' }));
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const createTestCampaign = createAsyncThunk(
  'testCampaignForm/createTestCampaign',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState().testCampaignFormReducer;
      const examRoom = await examRoomApi.create(
        convertDataRoom(currentState.item, currentState.requireInfo),
      );
      thunkAPI.dispatch(
        showAlert({ message: 'Them thanh công', type: 'success' }),
      );
      thunkAPI.dispatch(
        onchangeRouterLink(`/test-campaigns/${examRoom?.data?.id}/edit`),
      );
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

const testCampaignFormSlice = createSlice({
  name: 'testCampaignForm',
  initialState: {
    exams: [],
    category: [],
    keyword: '',
    item: {
      exam_id: null,
      name: '',
      code_type: 0,
      pass_mark: 0,
      code_room: '',
      description: '',
      time_limit: [],
      is_require_full_name: 1, //0
      is_require_email: null, //1
      is_require_phone: null, //2
      is_require_group: null, //3
      is_require_identify_code: null, //4
    },
    requireInfo: [0],
    targetSubject: '',
    isLoading: false,
    isDialog: false,
  },
  reducers: {
    onSearch: (state, action) => {
      state.keyword = action.payload;
    },
    onChangeSubject: (state, action) => {
      state.targetSubject = action.payload.targetSubject;
      state.keyword = action.payload.keyword;
    },
    setName: (state, action) => {
      state.item.name = action.payload;
    },
    setDescription: (state, action) => {
      state.item.description = action.payload;
    },
    setLimitTime: (state, action) => {
      state.item.time_limit = action.payload;
    },
    setCodeType: (state, action) => {
      state.item.code_type = action.payload;
    },
    setPassMark: (state, action) => {
      state.item.pass_mark = action.payload;
    },
    setCodeRoom: (state, action) => {
      state.item.code_room = action.payload;
    },
    setExamId: (state, action) => {
      state.item.exam_id = action.payload;
    },
    setRequireInfo: (state, action) => {
      state.requireInfo = action.payload;
    },
  },
  extraReducers: {
    [reloadData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [reloadData.fulfilled]: (state, action) => {
      state.exams = action.payload[0].data?.rows;
      state.category = action.payload[1].data;
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

    [createTestCampaign.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createTestCampaign.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [createTestCampaign.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const testCampaignFormSelector = (state) =>
  state.testCampaignFormReducer;

export const {
  onSearch,
  onChangeSubject,
  setExamId,
  setName,
  setLimitTime,
  setDescription,
  setCodeType,
  setPassMark,
  setCodeRoom,
  setRequireInfo,
} = testCampaignFormSlice.actions;

export default testCampaignFormSlice.reducer;
