import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  reloadData,
  testCampaignFormSelector,
  destroy,
} from 'slices/testCampain/testCampaignForm';
import LayoutForm from './views/LayoutForm';

const TestCampaignLayoutForm = () => {
  const dispatch = useDispatch();
  const destroyLayer = () => {
    dispatch(destroy());
  };
  const { targetSubject, keyword } = useSelector(testCampaignFormSelector);
  useEffect(() => {
    destroyLayer();
  }, []);
  useEffect(() => {
    dispatch(reloadData());
  }, [targetSubject, keyword]);

  return (
    <div className='TestCampaignLayoutForm container'>
      <LayoutForm />
    </div>
  );
};

export default TestCampaignLayoutForm;
