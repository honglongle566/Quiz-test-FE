import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from 'slices/core/appState';

const RegisterForm = (props) => {
  const { t } = useTranslation('common', 'login');
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    dispatch(registerUser(values));
  };

  document.title = t('Register', { ns: 'login' });
  return (
    <Row justify='center'>
      <Col span={24} className='mb-2'>
        <h3>{t('Register', { ns: 'login' })}</h3>
      </Col>
      <Col span={24}>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className='auth__form'
        >
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: t('The_Full_name_field_is_required', {
                  ns: 'login',
                }),
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t('Full_name', { ns: 'login' })}
            />
          </Form.Item>

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
            hasFeedback
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
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('Password', { ns: 'login' })}
            />
          </Form.Item>

          <Form.Item
            name='confPassword'
            rules={[
              {
                required: true,
                message: t('The_Password_confirmation_field_is_required', {
                  ns: 'login',
                }),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      t(
                        'The_Password_confirmation_confirmation_does_not_match',
                        {
                          ns: 'login',
                        },
                      ),
                    ),
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('Password_confirmation', { ns: 'login' })}
              minLength={6}
              maxLength={20}
            />
          </Form.Item>

          <Form.Item className='mt-4'>
            <Button type='primary' htmlType='submit' block>
              {t('Register', { ns: 'login' })}
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col className='mt-2'>
        <span className='text_mute'>
          {t('Already_have_an_account', { ns: 'login' })}{' '}
        </span>
        <Link to='/login'>{t('Login', { ns: 'login' })}</Link>
      </Col>
    </Row>
  );
};

export default RegisterForm;
