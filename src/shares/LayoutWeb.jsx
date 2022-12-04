import { Col, Row } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import HeaderPage from 'shares/HeaderPage';
import PageLoading from 'shares/PageLoading';
import AlertLayout from 'shares/common/AlertLayout';

const LayoutWeb = (props) => {
  const navigate = useNavigate();
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
            <Col>
              <Outlet />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default LayoutWeb;
