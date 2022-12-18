import { useEffect } from 'react';
import LayoutForm from './views/LayoutForm';
import {
  destroy,
  initData,
  setIsPage,
  setTargetId,
  setTargetTestId,
} from 'slices/bank/bankForm';
import { useDispatch } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const BankLayoutForm = () => {
  const param = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const destroyLayer = () => {
    dispatch(destroy());
  };
  useEffect(() => {
    destroyLayer();
    if (searchParams.get('test_id') && param?.id) {
      dispatch(setTargetTestId(searchParams.get('test_id')));
      dispatch(setTargetId(param.id));
      dispatch(setIsPage('TEST_UPDATE_QUESTION'));
    } else if (searchParams.get('test_id')) {
      dispatch(setTargetTestId(searchParams.get('test_id')));
      dispatch(setIsPage('TEST_CREATE_QUESTION'));
    } else if (param?.id) {
      dispatch(setTargetId(param.id));
      dispatch(setIsPage('UPDATE'));
    } else {
      dispatch(setIsPage('CREATE'));
    }
    dispatch(initData());
  }, []);
  useEffect(() => {
    return () => {
      destroyLayer();
    };
  });
  return (
    <div className='BankLayoutForm container'>
      <LayoutForm />
    </div>
  );
};

export default BankLayoutForm;
