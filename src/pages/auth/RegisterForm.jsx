import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function RegisterForm(props) {
  const { t, i18n } = useTranslation("common", "login");
  const [msg, setMsg] = useState("");

  const onFinish = async (values) => {};

  document.title = t("Register", { ns: "login" });
  return (
    <Row justify="center">
      <Col span={24} className="mb-2">
        <h3>{t("Register", { ns: "login" })}</h3>
      </Col>
      <Col span={24}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="auth__form"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: t("The_Full_name_field_is_required", {
                  ns: "login",
                }),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t("Full_name", { ns: "login" })}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: t("The_Email_field_is_required", {
                  ns: "login",
                }),
              },
            ]}
          >
            <Input type="email" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

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
            />
          </Form.Item>

          <Form.Item
            name="confPassword"
            rules={[
              {
                required: true,
                message: t("The_Password_confirmation_field_is_required", {
                  ns: "login",
                }),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("Password_confirmation", { ns: "login" })}
              minLength={6}
              maxLength={20}
            />
          </Form.Item>

          <p className="text_red">
            {msg === "The Password confirmation confirmation does not match" &&
              t("The_Password_confirmation_confirmation_does_not_match", {
                ns: "login",
              })}
          </p>
          <p className="text_red">
            {msg === "Email has been already existed" &&
              t("Email_has_been_already_existed", { ns: "login" })}
          </p>

          <Form.Item className="mt-2">
            <Button type="primary" htmlType="submit" block>
              {t("Register", { ns: "login" })}
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col className="mt-2">
        <span className="text_mute">
          {t("Already_have_an_account", { ns: "login" })}{" "}
        </span>
        <Link to="/login">{t("Login", { ns: "login" })}</Link>
      </Col>
    </Row>
  );
}

export default RegisterForm;
