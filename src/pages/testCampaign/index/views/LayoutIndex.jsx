import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePageNo,
  testCampaignIndexSelector,
} from 'slices/testCampain/testCampaignIndex';
import ListIndex from './ListIndex';
import SearchForm from './SearchForm';
const LayoutIndex = () => {
  const dispatch = useDispatch();
  const {
    pagination: { total_items, total_pages, current_page, rows },
  } = useSelector(testCampaignIndexSelector);
  return (
    <div>
      <h6 className='mb-3'>Đợt thi tuyển</h6>
      <SearchForm />
      <ListIndex />
      <div className='d-flex justify-content-center'>
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
