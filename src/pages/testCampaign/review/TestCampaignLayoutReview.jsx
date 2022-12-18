import React from 'react';
import { useEffect } from 'react';
import LayoutReview from './views/LayoutReview';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reloadData } from 'slices/testCampain/testCampaignReview';

const TestCampaignLayoutReview = () => {
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (param?.id) {
      dispatch(reloadData(param?.id));
    }
  }, []);
  return (
    <div className='TestCampaignLayoutReview container'>
      <LayoutReview />
    </div>
  );
};

export default TestCampaignLayoutReview;
