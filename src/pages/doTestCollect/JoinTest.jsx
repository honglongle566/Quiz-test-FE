import { Button, Form, Input } from 'antd';

const JoinTest = ({ setIsAccessCode }) => {
  const onFinish = (values) => {
    console.log('Success:', values);
    setIsAccessCode(false);
  };

  return (
    <Form
      name='basic'
      layout='vertical'
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
    >
      <Form.Item
        label='Mã truy cập'
        name='username'
        rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type='primary' block htmlType='submit'>
          Tiep tuc
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JoinTest;
