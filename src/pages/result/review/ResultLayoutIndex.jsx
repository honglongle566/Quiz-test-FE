import React, { useEffect } from 'react';
import LayoutReview from './views/LayoutReview';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reloadData } from 'slices/result/resultCandiate';

const ResultLayoutIndex = () => {
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (param?.id) {
      dispatch(reloadData(param?.id));
    }
  }, []);
  return (
    <div className='ResultLayoutIndex'>
      <LayoutReview />
    </div>
  );
};

export default ResultLayoutIndex;
