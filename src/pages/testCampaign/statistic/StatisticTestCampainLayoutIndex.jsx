import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getListCampain } from 'slices/statistic/statisticAll';
import LayoutReview from './views/LayoutReview';

const StatisticTestCampainLayoutIndex = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListCampain());
  }, []);
  return (
    <div className='StatisticTestCampainLayoutIndex container'>
      <LayoutReview />
    </div>
  );
};

export default StatisticTestCampainLayoutIndex;
