import { Tabs } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
const { TabPane } = Tabs;

const CategoryView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("category");
  let location = useLocation();
  function callback(key) {
    navigate(key);
  }
  return (
    <div className="container tab-style">
      <Tabs defaultActiveKey={location.pathname} onChange={callback}>
        <TabPane
          tab={t("category", { ns: "category" })}
          key="/test-categories"
        ></TabPane>
        <TabPane
          tab={t("question_group", { ns: "category" })}
          key="/question-group"
        ></TabPane>
      </Tabs>
      <Outlet />
    </div>
  );
};

export default CategoryView;
