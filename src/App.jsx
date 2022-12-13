import { useRoutes } from 'react-router-dom';
import AlertLayout from 'shares/common/AlertLayout';
import RouterLayout from 'shares/common/RouterLayout';
import { routes } from './routers/routers';

const App = () => {
  let element = useRoutes(routes);

  return (
    <>
      <AlertLayout />
      <RouterLayout />
      {element}
    </>
  );
};

export default App;
