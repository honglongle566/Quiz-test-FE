import { Button, Form, Input } from 'antd';
import { joinTest } from 'slices/doTest/doTest';
import { useDispatch } from 'react-redux';

const JoinTest = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(joinTest(values));
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
        name='code_room'
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
