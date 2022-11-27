import { useEffect } from 'react';
import LayoutForm from './views/LayoutForm';
import { initData, setIsCreate, setTargetId } from 'slices/bank/bankForm';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const BankLayoutForm = () => {
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (param?.id) {
      console.log('update', param?.id);
      dispatch(setTargetId(param.id));
      dispatch(setIsCreate(false));
    } else {
      dispatch(setIsCreate(true));
      console.log('create');
    }
    dispatch(initData());
  }, []);
  return (
    <div className='BankLayoutForm container'>
      <LayoutForm />
    </div>
  );
};

export default BankLayoutForm;
