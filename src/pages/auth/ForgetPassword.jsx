import { MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ForgetPassword(props) {
  const { t, i18n } = useTranslation("common", "login");

  const onFinish = async (values) => {};

  document.title = t("Login", { ns: "login" });

  return (
    <Row justify="center">
      <Col span={24}>
        <h3>{t("Forget_password", { ns: "login" })}</h3>
      </Col>
      <Col>
        <p className="text_mute">{t("Enter_the_email", { ns: "login" })}</p>
      </Col>
      <Col span={24}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="auth__form"
        >
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

          <p className="text_red">
            {t("Email_is_not_registered", { ns: "login" })}
          </p>

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

export default ForgetPassword;
