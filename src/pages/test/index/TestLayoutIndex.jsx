import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutIndex from './views/LayoutIndex';
import { useNavigate } from 'react-router-dom';
import { testIndexSelector, destroy, reloadData } from 'slices/test/testIndex';

const TestLayoutIndex = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isCreate,
    keyword,
    targetCreate,
    targetSubject,
    pagination: { current_page },
  } = useSelector(testIndexSelector);

  useEffect(() => {
    if (isCreate) {
      navigate(`/tests/${targetCreate}/create`);
      dispatch(destroy());
    }
  }, [isCreate]);

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
