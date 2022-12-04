import { Col, Row } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AlertLayout from 'shares/common/AlertLayout';
import HeaderPage from 'shares/HeaderPage';
import PageLoading from 'shares/PageLoading';
import SideBar from 'shares/SideBar';

const LayoutWeb = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div className='layout-web'>
          <AlertLayout />
          <HeaderPage />
          <Row justify='center' className='layout-web__content'>
            <Col span={4}>
              <SideBar />
            </Col>
            <Col span={20} className='d-flex justify-content-center mt-4'>
              <Outlet />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default LayoutWeb;
