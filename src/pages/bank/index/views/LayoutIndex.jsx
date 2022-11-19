import ListIndex from "./ListIndex";
import SearchForm from "./SearchForm";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changePageNo, bankIndexSliceSelector } from "slices/bank/bankIndex";

const LayoutIndex = () => {
  const dispatch = useDispatch();
  const {
    pagination: { total_items, total_pages, current_page, rows },
  } = useSelector(bankIndexSliceSelector);
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
    </div>
  );
};

export default LayoutIndex;
