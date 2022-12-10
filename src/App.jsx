import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router-dom';
import AlertLayout from 'shares/common/AlertLayout';
import RouterLayout from 'shares/common/RouterLayout';
import PageLoading from 'shares/PageLoading';
import { appStateSelector, loadUser } from 'slices/core/appState';
import { routes } from './routers/routers';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authLoading, isAuthenticated } = useSelector(appStateSelector);
  let element = useRoutes(routes);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) navigate('/login');
    else if (isAuthenticated && !authLoading) navigate('/');
  }, [authLoading, isAuthenticated]);

  if (authLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <AlertLayout />
      <RouterLayout />
      {element}
    </>
  );
};

export default App;
