import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appStateSelector, onchangeRouterLink } from 'slices/core/appState';
import { useNavigate } from 'react-router-dom';

const RouterLayout = () => {
  const { routerLink } = useSelector(appStateSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clearRouterLink = () => {
    dispatch(onchangeRouterLink(''));
  };
  useEffect(() => {
    if (routerLink) {
      navigate(routerLink);
    }
    return clearRouterLink;
  }, [routerLink]);
};

export default RouterLayout;
