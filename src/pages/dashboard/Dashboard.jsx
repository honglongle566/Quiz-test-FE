import {
  FileTextOutlined,
  FolderOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Dashboard = (props) => {
  const { t } = useTranslation('common');
  return (
    <div className='dashboard container'>
      <h6>{t('header.dashboard')}</h6>
      <div className='grid-box'>
        <div className='box color-blue'>
          <div className='content'>
            <div className='title'> {t('header.test')}</div>
            <div className='number'>123</div>
          </div>
          <div className='icon'>
            <FileTextOutlined />
          </div>
        </div>
        <div className='box color-yellow'>
          <div className='content'>
            <div className='title'> {t('header.question_bank')} </div>
            <div className='number'>123</div>
          </div>
          <div className='icon'>
            <QuestionCircleOutlined />
          </div>
        </div>
        <div className='box color-green'>
          <div className='content'>
            <div className='title'> {t('header.category')}</div>
            <div className='number'>123</div>
          </div>
          <div className='icon'>
            <FolderOutlined />
          </div>
        </div>
        <div className='box color-pink'>
          <div className='content'>
            <div className='title'> {t('header.test_campaign')}</div>
            <div className='number'>123</div>
          </div>
          <div className='icon'>
            <LinkOutlined />
          </div>
        </div>
      </div>
      <div className='box-group'>
        <div className='box-content'>
          <div className='title'>Dự án Quiz Test</div>
          <div className='group'>Nhóm:</div>
          <div className='content'>Thành viên: </div>
          <div className='list-item'>
            <div>Nguyễn Minh Quang - 18021045</div>
            <div>Ngô Ngọc Hoàn - 18020539</div>
            <div>Lê Hồng Long - 18020033</div>
          </div>
        </div>
        <div className='icon-logo'>
          <div className='logo'>
            <span className='logo__sm'>Quiz Test</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
