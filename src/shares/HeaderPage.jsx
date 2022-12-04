import { UpOutlined } from '@ant-design/icons';
import { Avatar, BackTop, Button, Card, Col, Dropdown, Menu, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
  appStateSelector,
} from 'slices/core/appState';

const HeaderPage = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation('common');
  const { language } = useSelector(appStateSelector);
  const Logout = async () => {};

  const dispatch = useDispatch();

  const handleClick = (language) => {
    if (language === LANGUAGE_VI) {
      dispatch(changeLocales(language));
      i18n.changeLanguage(LANGUAGE_EN);
    } else {
      dispatch(changeLocales(LANGUAGE_VI));
      i18n.changeLanguage(LANGUAGE_VI);
    }
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to='/account/profile'>{t('header.account_manager')}</Link>
          ),
          key: '2',
        },
        {
          label: <Link to='/account/profile'>{t('header.profile_info')}</Link>,
          key: '3',
        },
        {
          type: 'divider',
        },
        {
          label: <a onClick={Logout}>{t('header.logout')}</a>,
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
            <Card.Meta
              className='avatar'
              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
            />
          </a>
        </Dropdown>
      </Col>
      <Col span={1} className='flex-end'>
        <Button
          type='link'
          onClick={() => handleClick(language)}
          className='btn-space-none'
        >
          {t('header.language')}&nbsp;
          {language === LANGUAGE_VI ? (
            <img
              className='language'
              src={require('assets/img/US.png')}
              alt=''
            />
          ) : (
            <img
              className='language'
              src={require('assets/img/VI.png')}
              alt=''
            />
          )}
        </Button>
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
