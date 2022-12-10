import React from 'react';
import LayoutIndex from './views/LayoutIndex';
import {
  testCampaignIndexSelector,
  reloadData,
} from 'slices/testCampain/testCampaignIndex';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TestCampaignLayoutIndex = () => {
  const dispatch = useDispatch();
  const {
    keyword,
    pagination: { current_page },
  } = useSelector(testCampaignIndexSelector);

  useEffect(() => {
    dispatch(reloadData());
  }, [keyword, current_page]);
  return (
    <div className='TestCampaignLayoutIndex container'>
      <LayoutIndex />
    </div>
  );
};

export default TestCampaignLayoutIndex;
