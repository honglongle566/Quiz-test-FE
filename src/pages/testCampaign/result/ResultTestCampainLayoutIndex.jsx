import { useEffect } from 'react';
import LayoutReview from './views/LayoutReview';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reloadData } from 'slices/testCampain/testCampaignResult';

const ResultTestCampainLayoutIndex = () => {
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('reloadData');
    if (param?.id) {
      console.log('ok');
      dispatch(reloadData(param?.id));
    }
  }, []);
  return (
    <div className='ResultTestCampainLayoutIndex container'>
      <LayoutReview />
    </div>
  );
};

export default ResultTestCampainLayoutIndex;
