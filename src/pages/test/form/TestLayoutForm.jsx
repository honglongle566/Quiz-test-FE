import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reloadData, setTargetExam } from 'slices/test/testForm';
import LayoutForm from './views/LayoutForm';

const TestLayoutForm = () => {
  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    if (param?.id) {
      dispatch(setTargetExam(param?.id));
      dispatch(reloadData());
    }
  }, []);
  return (
    <div className='TestLayoutForm'>
      <LayoutForm />
    </div>
  );
};

export default TestLayoutForm;
