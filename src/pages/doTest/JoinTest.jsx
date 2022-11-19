import { Button, Col, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const JoinTest = () => {
  const accessCodeLink = true;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Mã truy cập"
        name="username"
        rules={[{ required: true, message: "Trường này là bắt buộc!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item htmlType="submit">
        <Link to="info-collect">
          <Button type="primary" block>
            Tiep tuc
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default JoinTest;
