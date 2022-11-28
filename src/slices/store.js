import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './core/appState';
import questionGroupReducer from './category/questionGroup';
import categoryGroupReducer from './category/categoryGroup';
import bankFormSliceReducer from './bank/bankForm';
import bankIndexSliceReducer from './bank/bankIndex';
import testIndexReducer from './test/testIndex';

const rootReducer = {
  appStateReducer,
  questionGroupReducer,
  categoryGroupReducer,
  bankFormSliceReducer,
  bankIndexSliceReducer,
  testIndexReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
