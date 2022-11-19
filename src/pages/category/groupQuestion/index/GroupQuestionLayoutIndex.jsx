import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  questionGroupsSelector,
  reloadData,
} from "slices/category/questionGroup";
import LayoutIndex from "./views/LayoutIndex";

const GroupQuestionLayoutIndex = () => {
  const dispatch = useDispatch();
  const {
    keyword,
    pagination: { current_page },
  } = useSelector(questionGroupsSelector);

  useEffect(() => {
    dispatch(reloadData());
  }, [keyword, current_page]);

  return (
    <div className="GroupQuestionLayoutIndex container">
      <LayoutIndex />
    </div>
  );
};

export default GroupQuestionLayoutIndex;
