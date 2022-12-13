import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doTestSelector, registerCandidate } from 'slices/doTest/doTest';

const InfoCollect = () => {
  const { examRoom } = useSelector(doTestSelector);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(registerCandidate(values));
  };

  return (
    <Col>
      <Form name='basic' layout='vertical' onFinish={onFinish}>
        <Row>
          {examRoom.is_require_identify_code && (
            <Col span={24}>
              <Form.Item
                label='Mã định danh '
                name='identify_code'
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          )}
          {examRoom.is_require_group && (
            <Col span={24}>
              <Form.Item
                label='Nhóm '
                name='group'
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          )}
          {examRoom.is_require_full_name && (
            <Col span={24}>
              <Form.Item
                label='Họ và tên'
                name='full_name'
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          )}
          {examRoom.is_require_email && (
            <Col span={24}>
              <Form.Item
                label='Email'
                name='email'
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          )}
          {examRoom.is_require_phone && (
            <Col span={24}>
              <Form.Item
                label='Phone'
                name='phone'
                rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Tiếp tục
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default InfoCollect;
