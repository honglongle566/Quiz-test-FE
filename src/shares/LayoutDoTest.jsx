import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderAuth from 'shares/HeaderAuth';
import PageLoading from 'shares/PageLoading';

const LayoutDoTest = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div className='do-test'>
          <HeaderAuth />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default LayoutDoTest;
