import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HeaderPage from 'shares/HeaderPage';
import PageLoading from 'shares/PageLoading';
import SideBar from 'shares/SideBar';
import { appStateSelector, loadUser } from 'slices/core/appState';

const LayoutWeb = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const { authLoading, isAuthenticated } = useSelector(appStateSelector);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) navigate('/login');
    else if (
      isAuthenticated &&
      !authLoading &&
      ['/login', '/register'].includes(location.pathname)
    ) {
      navigate('/');
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading) {
    return <PageLoading />;
  }

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
