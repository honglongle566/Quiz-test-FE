import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  bankIndexSliceSelector,
  reloadData,
  setIsPage,
  setTargetExamId,
} from 'slices/bank/bankIndex';
import LayoutIndex from './views/LayoutIndex';
import { useSearchParams } from 'react-router-dom';

const BankLayoutIndex = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {
    keyword,
    targetGroupQuestion,
    pagination: { current_page },
  } = useSelector(bankIndexSliceSelector);

  useEffect(() => {
    if (searchParams.get('test_id')) {
      dispatch(setIsPage('CREATE'));
      dispatch(setTargetExamId(searchParams.get('test_id')));
    } else {
      dispatch(setIsPage('INDEX'));
    }
    dispatch(reloadData());
  }, [keyword, current_page, targetGroupQuestion]);
  return (
    <div className='BankLayoutIndex container'>
      <LayoutIndex />
    </div>
  );
};

export default BankLayoutIndex;
