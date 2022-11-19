import { Pagination, Row } from "antd";
import ConfirmDialog from "./ConfirmDialog";
import ListIndex from "./ListIndex";
import SearchForm from "./SearchForm";
import {
  questionGroupsSelector,
  changePageNo,
} from "slices/category/questionGroup";
import { useDispatch, useSelector } from "react-redux";
const LayoutIndex = () => {
  const dispatch = useDispatch();
  const {
    pagination: { total_items, total_pages, current_page, rows },
  } = useSelector(questionGroupsSelector);

  return (
    <div>
      <SearchForm />
      <ListIndex />
      <div className="d-flex justify-content-center">
        <Pagination
          defaultCurrent={1}
          current={current_page}
          onChange={(page) => dispatch(changePageNo(page))}
          total={total_items}
          pageSize={rows}
        />
      </div>
      <ConfirmDialog />
    </div>
  );
};

export default LayoutIndex;
