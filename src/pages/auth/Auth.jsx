import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PageLoading from 'shares/PageLoading';
import { appStateSelector, loadUser } from 'slices/core/appState';
import HeaderAuth from '../../shares/HeaderAuth';

const Auth = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const { authLoading, isAuthenticated } = useSelector(appStateSelector);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  if (authLoading) {
    return <PageLoading />;
  }
  return (
    <div className='auth'>
      <HeaderAuth />
      <Row justify='center'>
        <Col>
          <div className='auth__wrapper'>
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
