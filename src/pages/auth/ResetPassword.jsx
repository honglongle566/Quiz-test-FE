import { LockOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ResetPassword(props) {
  const { t, i18n } = useTranslation("common", "login");
  const [msg, setMsg] = useState("");

  const onFinish = async (values) => {};

  document.title = t("Login", { ns: "login" });

  return (
    <Row justify="center">
      <Col span={24}>
        <h3>{t("Reset_password", { ns: "login" })}</h3>
      </Col>
      <Col>
        <p className="text_mute">
          {t("Update_your_new_password", { ns: "login" })}
        </p>
      </Col>
      <Col span={24}>
        <Form initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("The_Password_field_is_required", {
                  ns: "login",
                }),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("Password", { ns: "login" })}
              minLength={6}
              maxLength={20}
            />
          </Form.Item>

          {msg}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("Confirm", { ns: "login" })}
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col>
        <span className="text_mute">
          {t("Already_have_an_account", { ns: "login" })}{" "}
        </span>
        <Link to="/login">{t("Login", { ns: "login" })}</Link>
      </Col>
    </Row>
  );
}

export default ResetPassword;
