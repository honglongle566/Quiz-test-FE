import { UpOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, BackTop, Button, Card, Col, Dropdown, Menu, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  appStateSelector,
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
  logoutUser,
} from 'slices/core/appState';

const HeaderPage = () => {
  const { t, i18n } = useTranslation('common');
  const { language } = useSelector(appStateSelector);

  const dispatch = useDispatch();

  const menu = (
    <Menu
      items={[
        {
          label: (
            <a onClick={() => dispatch(logoutUser())}>{t('header.logout')}</a>
          ),
          key: '4',
          danger: true,
        },
      ]}
    />
  );

  return (
    <Row align='middle' justify='space-between' className='header-page'>
      <Col span={4}>
        <Link to='/'>
          <span className='logo logo__md mr-2'>Quiz Test</span>
        </Link>
      </Col>
      <Col span={16}></Col>
      <Col span={3} className='flex-end'>
        <Dropdown overlay={menu} placement='bottomRight'>
          <a onClick={(e) => e.preventDefault()}>
            <Card.Meta avatar={<Avatar size={36} icon={<UserOutlined />} />} />
          </a>
        </Dropdown>
      </Col>
      <BackTop>
        <div className='up'>
          <UpOutlined />
        </div>
      </BackTop>
    </Row>
  );
};

export default HeaderPage;
