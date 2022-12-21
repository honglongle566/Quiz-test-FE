import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './core/appState';
import questionGroupReducer from './category/questionGroup';
import categoryGroupReducer from './category/categoryGroup';
import bankFormSliceReducer from './bank/bankForm';
import bankIndexSliceReducer from './bank/bankIndex';
import testIndexReducer from './test/testIndex';
import testFormReducer from './test/testForm';
import testCampaignFormReducer from './testCampain/testCampaignForm';
import testCampaignIndexReducer from './testCampain/testCampaignIndex';
import doTestReducer from './doTest/doTest';
import testCampaignReviewReducer from './testCampain/testCampaignReview';
import resultCandiateReducer from './result/resultCandiate';
import testCampaignResultReducer from './testCampain/testCampaignResult';

const rootReducer = {
  appStateReducer,
  questionGroupReducer,
  categoryGroupReducer,
  bankFormSliceReducer,
  bankIndexSliceReducer,
  testIndexReducer,
  testFormReducer,
  testCampaignFormReducer,
  testCampaignIndexReducer,
  doTestReducer,
  testCampaignReviewReducer,
  resultCandiateReducer,
  testCampaignResultReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
