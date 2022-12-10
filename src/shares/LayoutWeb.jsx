import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderPage from 'shares/HeaderPage';
import SideBar from 'shares/SideBar';

const LayoutWeb = (props) => {
  return (
    <>
      <div className='layout-web'>
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
    </>
  );
};

export default LayoutWeb;
