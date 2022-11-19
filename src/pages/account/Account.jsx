import { UnlockFilled, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Menu, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

function Account(props) {
  const { t } = useTranslation("account");

  return (
    <>
      <Row gutter={[16, 16]} className="account container">
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>{t("Account", { ns: "account" })}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <div className="white-bg">
            <Row>
              <Col span={6}>
                <Menu defaultSelectedKeys={["/account/profile"]}>
                  <Menu.Item key={1}>
                    <Link to="/account/profile">
                      <UserOutlined /> {t("Account_info", { ns: "account" })}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={2}>
                    <Link to="/account/change-password">
                      <UnlockFilled /> {t("Change_password", { ns: "account" })}
                    </Link>
                  </Menu.Item>
                </Menu>
              </Col>

              <Col span={18}>
                <div className="p-4">
                  <Outlet />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Account;
