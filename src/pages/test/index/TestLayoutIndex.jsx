import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reloadData, testIndexSelector } from 'slices/test/testIndex';
import LayoutIndex from './views/LayoutIndex';

const TestLayoutIndex = () => {
  const dispatch = useDispatch();
  const {
    keyword,
    targetSubject,
    pagination: { current_page },
  } = useSelector(testIndexSelector);

  useEffect(() => {
    dispatch(reloadData());
  }, [keyword, current_page, targetSubject]);

  return (
    <div className='container TestLayoutIndex'>
      <LayoutIndex />
    </div>
  );
};

export default TestLayoutIndex;
