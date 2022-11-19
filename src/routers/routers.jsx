import HeaderDoTest from "../components/commons/HeaderDoTest";
import LayoutComponent from "../components/commons/LayoutComponent";
import LayoutWeb from "../components/commons/LayoutWeb";
import Account from "../pages/account/Account";
import AccountInfo from "../pages/account/AccountInfo";
import ChangePassword from "../pages/account/ChangePassword";
import Auth from "../pages/auth/Auth";
import ForgetPassword from "../pages/auth/ForgetPassword";
import LoginForm from "../pages/auth/LoginForm";
import RegisterForm from "../pages/auth/RegisterForm";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import DoTest from "../pages/doTest/DoTest";
import ExamQuestions from "../pages/doTest/ExamQuestions";
import Guide from "../pages/doTest/Guide";
import InfoCollect from "../pages/doTest/InfoCollect";
import JoinTest from "../pages/doTest/JoinTest";
import HeaderResult from "../pages/result/HeadResult";

import CreateCampaign from "../pages/testCampaign/CreateCampaign";
import ResultsStatistic from "../pages/testCampaign/DetailResultCampaign";
import Preview from "../pages/testCampaign/EditCampaign";
import QuestionStatistic from "../pages/testCampaign/QuestionStatistic";
import ResultCampaign from "../pages/testCampaign/ResultCampaign";
import TestCampaigns from "../pages/testCampaign/TestCampaigns";

// New
// Category
import CategoryView from "../pages/category/CategoryView";
import CategoryLayoutIndex from "../pages/category/category/index/CategoryLayoutIndex";
import GroupQuestionLayoutIndex from "../pages/category/groupQuestion/index/GroupQuestionLayoutIndex";
// Test
import TestLayoutIndex from "../pages/test/index/TestLayoutIndex";
import TestLayoutReview from "../pages/test/review/TestLayoutReview";
import TestLayoutForm from "../pages/test/form/TestLayoutForm";
//Statistic
import Statistic from "../pages/statistic/Statistic";
import TabCandidateLayoutIndex from "../pages/statistic/candidate/index/TabCandidateLayoutIndex";
import TabTestLayoutIndex from "../pages/statistic/test/index/TabTestLayoutIndex";
import TabTestCampaignLayoutIndex from "../pages/statistic/testCampaign/index/TabTestCampaignLayoutIndex";
//bank
import BankLayoutIndex from "pages/bank/index/BankLayoutIndex";
import BankLayoutForm from "pages/bank/form/BankLayoutForm";

export const routes = [
  {
    path: "/",
    element: <LayoutWeb />,
    children: [
      // NEW
      {
        path: "/test-categories",
        element: <CategoryView />,
        children: [{ index: true, element: <CategoryLayoutIndex /> }],
      },
      {
        path: "/question-group",
        element: <CategoryView />,
        children: [{ index: true, element: <GroupQuestionLayoutIndex /> }],
      },
      {
        path: "/tests",
        element: <LayoutComponent />,
        children: [
          { index: true, element: <TestLayoutIndex /> },
          {
            path: "/tests/:id/edit",
            element: <TestLayoutForm />,
          },
          {
            path: "/tests/:id/result",
            element: <TestLayoutReview />,
          },
        ],
      },
      {
        path: "/statistic",
        element: <Statistic />,
        children: [
          {
            path: "/statistic/campaigns",
            element: <TabTestCampaignLayoutIndex />,
          },
          {
            path: "/statistic/tests",
            element: <TabTestLayoutIndex />,
          },
          {
            path: "/statistic/answer-sheets",
            element: <TabCandidateLayoutIndex />,
          },
        ],
      },

      {
        path: "/bank",
        element: <LayoutComponent />,
        children: [
          { index: true, element: <BankLayoutIndex /> },
          {
            path: "/bank/create-question",
            element: <BankLayoutForm />,
          },
          {
            path: "/bank/question/:id/edit",
            element: <BankLayoutForm />,
          },
        ],
      },

      // Old
      { index: true, element: <Dashboard /> },
      {
        path: "results/:id",
        element: <ResultsStatistic />,
      },
      {
        path: "/test-campaigns",
        element: <LayoutComponent />,
        children: [
          { index: true, element: <TestCampaigns /> },
          {
            path: "/test-campaigns/create",
            element: <CreateCampaign />,
          },
          {
            path: "/test-campaigns/:id/result",
            element: <ResultCampaign />,
          },
          {
            path: "/test-campaigns/:id/edit",
            element: <Preview />,
          },
          {
            path: "/test-campaigns/:id/question-statistic",
            element: <QuestionStatistic />,
          },
        ],
      },
      {
        path: "/account",
        element: <Account />,
        children: [
          {
            path: "/account/profile",
            element: <AccountInfo />,
          },
          {
            path: "/account/change-password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
  {
    path: "/do-test",
    element: <DoTest />,
    children: [
      { index: true, element: <JoinTest /> },
      {
        path: "/do-test/info-collect",
        element: <InfoCollect />,
      },
    ],
  },
  {
    path: "/do-test-in-single",
    element: <HeaderDoTest />,
    children: [
      { index: true, element: <Guide /> },
      {
        path: "/do-test-in-single/exam-question",
        element: <ExamQuestions />,
      },
    ],
  },
  {
    path: "/result",
    element: <HeaderResult />,
  },
  {
    path: "/login",
    element: <Auth />,
    children: [{ index: true, element: <LoginForm /> }],
  },
  {
    path: "/register",
    element: <Auth />,
    children: [{ index: true, element: <RegisterForm /> }],
  },
  {
    path: "/forget-password/",
    element: <Auth />,
    children: [{ index: true, element: <ForgetPassword /> }],
  },
  {
    path: "/reset-password/",
    element: <Auth />,
    children: [{ index: true, element: <ResetPassword /> }],
  },
];

// config router https://stackblitz.com/github/remix-run/react-router/tree/main/examples/route-objects?file=src%2FApp.tsx
