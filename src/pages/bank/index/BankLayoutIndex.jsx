import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bankIndexSliceSelector, reloadData } from 'slices/bank/bankIndex';
import LayoutIndex from './views/LayoutIndex';

const BankLayoutIndex = () => {
  const dispatch = useDispatch();
  const {
    keyword,
    targetGroupQuestion,
    pagination: { current_page },
  } = useSelector(bankIndexSliceSelector);

  useEffect(() => {
    dispatch(reloadData());
  }, [keyword, current_page, targetGroupQuestion]);
  return (
    <div className='BankLayoutIndex container'>
      <LayoutIndex />
    </div>
  );
};

export default BankLayoutIndex;
