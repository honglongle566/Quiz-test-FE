import Account from 'pages/account/Account';
import AccountInfo from 'pages/account/AccountInfo';
import ChangePassword from 'pages/account/ChangePassword';

import Auth from 'pages/auth/Auth';
import ForgetPassword from 'pages/auth/ForgetPassword';
import LoginForm from 'pages/auth/LoginForm';
import RegisterForm from 'pages/auth/RegisterForm';
import ResetPassword from 'pages/auth/ResetPassword';

import Dashboard from 'pages/dashboard/Dashboard';

// New
// Category
import CategoryView from 'pages/category/CategoryView';
import CategoryLayoutIndex from 'pages/category/category/index/CategoryLayoutIndex';
import GroupQuestionLayoutIndex from 'pages/category/groupQuestion/index/GroupQuestionLayoutIndex';
// Test
import TestLayoutIndex from 'pages/test/index/TestLayoutIndex';
import TestLayoutReview from 'pages/test/review/TestLayoutReview';
import TestLayoutForm from 'pages/test/form/TestLayoutForm';
//Statistic
import Statistic from 'pages/statistic/Statistic';
import TabCandidateLayoutIndex from 'pages/statistic/candidate/index/TabCandidateLayoutIndex';
import TabTestLayoutIndex from 'pages/statistic/test/index/TabTestLayoutIndex';
import TabTestCampaignLayoutIndex from 'pages/statistic/testCampaign/index/TabTestCampaignLayoutIndex';
//bank
import BankLayoutIndex from 'pages/bank/index/BankLayoutIndex';
import BankLayoutForm from 'pages/bank/form/BankLayoutForm';

//result
import ResultLayoutIndex from 'pages/result/review/ResultLayoutIndex';

//layout
import LayoutComponent from 'shares/LayoutComponent';
import LayoutWeb from 'shares/LayoutWeb';

//Test campaign
import TestCampaigns from 'pages/testCampaign/index/TestCampaignLayoutIndex';
import TestCampaignLayoutForm from 'pages/testCampaign/form/TestCampaignLayoutForm';
import TestCampaignLayoutReview from 'pages/testCampaign/review/TestCampaignLayoutReview';
import ResultTestCampainLayoutIndex from 'pages/testCampaign/result/ResultTestCampainLayoutIndex';
import StatisticTestCampainLayoutIndex from 'pages/testCampaign/statistic/StatisticTestCampainLayoutIndex';

// Dotest
import LayoutDoTest from 'shares/LayoutDoTest';
import DoTest from 'pages/doTestCollect/DoTest';

import HeaderDoTest from 'shares/HeaderDoTest';
import Guide from 'pages/doTest/Guide';
import ExamQuestions from 'pages/doTest/ExamQuestions';

export const routes = [
  {
    path: '/',
    element: <LayoutWeb />,
    children: [
      {
        path: '/test-categories',
        element: <CategoryView />,
        children: [{ index: true, element: <CategoryLayoutIndex /> }],
      },
      {
        path: '/question-group',
        element: <CategoryView />,
        children: [{ index: true, element: <GroupQuestionLayoutIndex /> }],
      },
      {
        path: '/tests',
        element: <LayoutComponent />,
        children: [
          { index: true, element: <TestLayoutIndex /> },
          {
            path: '/tests/:id/edit',
            element: <TestLayoutForm />,
          },
          {
            path: '/tests/:id/create',
            element: <TestLayoutForm />,
          },
          {
            path: '/tests/:id/result',
            element: <TestLayoutReview />,
          },
        ],
      },
      {
        path: '/statistic',
        element: <Statistic />,
        children: [
          {
            path: '/statistic/campaigns',
            element: <TabTestCampaignLayoutIndex />,
          },
          {
            path: '/statistic/tests',
            element: <TabTestLayoutIndex />,
          },
          {
            path: '/statistic/answer-sheets',
            element: <TabCandidateLayoutIndex />,
          },
        ],
      },

      {
        path: '/bank',
        element: <LayoutComponent />,
        children: [
          { index: true, element: <BankLayoutIndex /> },
          {
            path: '/bank/create-question',
            element: <BankLayoutForm />,
          },
          {
            path: '/bank/question/:id/edit',
            element: <BankLayoutForm />,
          },
        ],
      },

      {
        path: '/test-campaigns',
        element: <LayoutComponent />,
        children: [
          { index: true, element: <TestCampaigns /> },
          {
            path: '/test-campaigns/create',
            element: <TestCampaignLayoutForm />,
          },
          {
            path: '/test-campaigns/:id/result',
            element: <ResultTestCampainLayoutIndex />,
          },
          {
            path: '/test-campaigns/:id/edit',
            element: <TestCampaignLayoutReview />,
          },
          {
            path: '/test-campaigns/:id/question-statistic',
            element: <StatisticTestCampainLayoutIndex />,
          },
        ],
      },

      // Old
      { index: true, element: <Dashboard /> },
      {
        path: '/account',
        element: <Account />,
        children: [
          {
            path: '/account/profile',
            element: <AccountInfo />,
          },
          {
            path: '/account/change-password',
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
  // New
  {
    path: '/info-collect',
    element: <LayoutDoTest />,
    children: [
      {
        path: '/info-collect/:id',
        element: <DoTest />,
      },
    ],
  },
  {
    path: '/do-test',
    element: <HeaderDoTest />,
    children: [
      { index: true, element: <Guide /> },
      {
        path: '/do-test/exam-question',
        element: <ExamQuestions />,
      },
    ],
  },
  {
    path: '/result',
    children: [
      {
        path: '/result/:id',
        element: <ResultLayoutIndex />,
      },
    ],
  },
  {
    path: '/login',
    element: <Auth />,
    children: [{ index: true, element: <LoginForm /> }],
  },
  {
    path: '/register',
    element: <Auth />,
    children: [{ index: true, element: <RegisterForm /> }],
  },
  {
    path: '/forget-password/',
    element: <Auth />,
    children: [{ index: true, element: <ForgetPassword /> }],
  },
  {
    path: '/reset-password/',
    element: <Auth />,
    children: [{ index: true, element: <ResetPassword /> }],
  },
];

// config router https://stackblitz.com/github/remix-run/react-router/tree/main/examples/route-objects?file=src%2FApp.tsx
