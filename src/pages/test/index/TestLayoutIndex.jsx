import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutIndex from './views/LayoutIndex';
import { useNavigate } from 'react-router-dom';
import { testIndexSelector, destroy } from 'slices/test/testIndex';

const TestLayoutIndex = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreate } = useSelector(testIndexSelector);
  useEffect(() => {
    if (isCreate) {
      navigate(`/tests/:id/create`);
      dispatch(destroy());
    }
  }, [isCreate]);

  return (
    <div className='container TestLayoutIndex'>
      <LayoutIndex />
    </div>
  );
};

export default TestLayoutIndex;
