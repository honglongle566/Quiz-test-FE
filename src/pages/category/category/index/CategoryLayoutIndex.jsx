import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryGroupSelector,
  reloadData,
} from "slices/category/categoryGroup";
import LayoutIndex from "./views/LayoutIndex";

const CategoryLayoutIndex = () => {
  const dispatch = useDispatch();
  const {
    keyword,
    pagination: { current_page },
  } = useSelector(categoryGroupSelector);

  useEffect(() => {
    dispatch(reloadData());
  }, [keyword, current_page]);
  return (
    <div className="CategoryLayoutIndex container">
      <LayoutIndex />
    </div>
  );
};

export default CategoryLayoutIndex;
