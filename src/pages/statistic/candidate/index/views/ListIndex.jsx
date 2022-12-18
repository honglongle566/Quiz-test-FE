import {
  FileFilled,
  FlagFilled,
  MailOutlined,
  PhoneOutlined,
  QrcodeOutlined,
  RocketOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ListIndex = () => {
  const { t } = useTranslation('statistic');
  const showEvaluate = () => {
    return (
      <Space size='middle'>
        <Badge
          count={t('passed', { ns: 'statistic' })}
          style={{
            backgroundColor: '#06ba02',
          }}
        ></Badge>
      </Space>
    );
  };

  return (
    <div className='table-box'>
      <div className='total-table text-left'>
        {t('total', { ns: 'statistic' })}: 1
      </div>
      <table>
        <thead className='ant-table-thead'>
          <tr>
            <th>{t('candidate_information', { ns: 'statistic' })}</th>
            <th>{t('test_information', { ns: 'statistic' })}</th>
            <th>{t('evaluate', { ns: 'statistic' })}</th>
            <th>{t('result', { ns: 'statistic' })}</th>
            <th>{t('time', { ns: 'statistic' })}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='ant-table-tbody'>
          <tr>
            <td>
              <p>
                <UserOutlined />
                Nguyễn Minh Quang
              </p>
              {/* <p>
                <QrcodeOutlined />
                identify_code
              </p>
              <p>
                <PhoneOutlined />
                phone
              </p>
              <p>
                <MailOutlined />
                email
              </p>
              <p>
                <TeamOutlined />
                group
              </p>
              <p>
                <RocketOutlined />
                position
              </p> */}
            </td>
            <td>
              <a href={`/tests/items.test_id/edit`} target='blank'>
                <FileFilled />
                Toán
              </a>
              <br />
              <a href={`/tests/test_campaign.id/edit`} target='blank'>
                <FlagFilled />
                Toán Cao Cấp
              </a>
            </td>
            <td>{showEvaluate()}</td>
            <td className='text-center'>
              <p>
                <span>90</span>/<span>100</span>
              </p>
              <p>(90%)</p>
            </td>
            <td>
              <p>
                {t('time_do_test', { ns: 'statistic' })}:{' '}
                <span>12/12/2022 12:00:00</span>
              </p>

              <p>
                {t('start_at', { ns: 'statistic' })}:{' '}
                <span>12/12/2022 12:05:00</span>
              </p>
              <p>
                {t('end_at', { ns: 'statistic' })}:{' '}
                <span>12/12/2022 12:06:03</span>
              </p>
            </td>
            <td>
              <Link to={`/results/items.id`}>
                <Button>{t('bt_result', { ns: 'statistic' })}</Button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListIndex;
