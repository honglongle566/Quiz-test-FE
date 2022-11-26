import { notification } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appStateSelector } from 'slices/core/appState';
import { hideAlert } from 'slices/core/appState';

const AlertLayout = () => {
  const { alert } = useSelector(appStateSelector);
  const dispatch = useDispatch();
  const clearAlert = () => {
    dispatch(hideAlert());
  };
  useEffect(() => {
    if (alert.message) {
      notification[alert.type]({
        message: alert.message,
      });
    }
    return clearAlert;
  }, [alert]);
};

export default AlertLayout;
