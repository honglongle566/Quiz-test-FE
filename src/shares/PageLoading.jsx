import React from 'react';
import { Spin } from 'antd';

const PageLoading = (props) => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh', width: '100vw' }}
    >
      <Spin size='large' />
    </div>
  );
};

export default PageLoading;
