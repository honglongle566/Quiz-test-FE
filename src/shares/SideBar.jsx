import {
  HomeOutlined,
  ClusterOutlined,
  PieChartOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  const { t } = useTranslation('common');

  return (
    <div className='sidebar'>
      <Menu
        className='pt-1 sidebar-menu'
        mode='vertical'
        selectedKeys={(() => {
          const string = /\/[a-z0-9_-]{0,32}/.exec(location.pathname)[0];
          if (string === '/question-tags') return '/test-categories';
          return string;
        })()}
        defaultSelectedKeys={['/']}
        items={[
          {
            key: '/',
            label: <Link to='/'>{t('header.dashboard')}</Link>,
            icon: <HomeOutlined />,
          },
          {
            key: '/test-categories',
            label: <Link to='/test-categories'>{t('header.category')}</Link>,
            icon: <ClusterOutlined />,
          },
          {
            key: '/tests',
            label: <Link to='/tests'>{t('header.test')}</Link>,
            icon: <ProfileOutlined />,
          },
          {
            key: '/test-campaigns',
            label: (
              <Link to='/test-campaigns'>{t('header.test_campaign')}</Link>
            ),
            icon: <FileDoneOutlined />,
          },
          {
            key: '/bank',
            label: <Link to='/bank'>{t('header.question_bank')}</Link>,
            icon: <FileTextOutlined />,
          },
          {
            key: '/statistic/campaigns',
            label: (
              <Link to='/statistic/campaigns'>{t('header.statistic')}</Link>
            ),
            icon: <PieChartOutlined />,
          },
        ]}
      />
    </div>
  );
};

export default SideBar;
