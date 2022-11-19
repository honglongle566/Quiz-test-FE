import { notification } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { appStateSelector } from "slices/core/appState";

const AlertLayout = () => {
  const { alert } = useSelector(appStateSelector);
  useEffect(() => {
    if (alert.message) {
      notification[alert.type]({
        message: alert.message,
      });
    }
  }, [alert]);
};

export default AlertLayout;
