import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from 'slices/core/appState';

const LoginForm = () => {
  const { t } = useTranslation('common', 'login');
  const dispatch = useDispatch();
  document.title = t('Login', { ns: 'login' });

  const onFinish = async (values) => {
    dispatch(loginUser(values));
  };
  return (
    <Row justify='center'>
      <Col span={24} className='mb-2'>
        <h3>{t('Login', { ns: 'login' })}</h3>
      </Col>
      <Col span={24}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className='auth__form'
        >
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: t('The_Email_field_is_required', {
                  ns: 'login',
                }),
              },
            ]}
          >
            <Input type='email' prefix={<MailOutlined />} placeholder='Email' />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: t('The_Password_field_is_required', {
                  ns: 'login',
                }),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('Password', { ns: 'login' })}
              minLength={6}
              maxLength={20}
            />
          </Form.Item>

          <Form.Item className='mt-4'>
            <Button type='primary' htmlType='submit' block>
              {t('Login', { ns: 'login' })}
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col className='mt-2'>
        <span className='text_mute'>
          {t('Do_not_have_an_account', { ns: 'login' })}{' '}
        </span>
        <Link to='/register'>{t('Register', { ns: 'login' })}</Link>
      </Col>
    </Row>
  );
};

export default LoginForm;
