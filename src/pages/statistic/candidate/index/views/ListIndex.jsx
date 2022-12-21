import {
  FileFilled,
  FlagFilled,
  MailOutlined,
  PhoneOutlined,
  RocketOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { statisticAllSelector } from 'slices/statistic/statisticAll';
import { useSelector } from 'react-redux';
import { formatTime } from 'utils/utils';

const ListIndex = () => {
  const { t } = useTranslation('statistic');
  const { candiate } = useSelector(statisticAllSelector);
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
          {candiate &&
            candiate.map((item) => (
              <tr>
                <td>
                  <p>
                    <UserOutlined />
                    Nguyễn Minh Quang
                  </p>
                  {item.phone && (
                    <p>
                      <PhoneOutlined /> {item.phone}
                    </p>
                  )}
                  {item.email && (
                    <p>
                      <MailOutlined /> {item.email}
                    </p>
                  )}
                  {item.group && (
                    <p>
                      <TeamOutlined /> {item.group}
                    </p>
                  )}
                  {item.identify_code && (
                    <p>
                      <RocketOutlined /> {item.identify_code}
                    </p>
                  )}
                </td>
                <td>
                  <a href={`/tests/items.test_id/edit`} target='blank'>
                    <FileFilled />
                    {item.exam.name}
                  </a>
                  <br />
                  <a href={`/tests/test_campaign.id/edit`} target='blank'>
                    <FlagFilled />
                    {item.examination_room.name}
                  </a>
                </td>
                <td>_</td>
                <td className='text-center'>
                  {item.candidate_result_details.length && (
                    <>
                      <p>
                        <span>{item.candidate_result_details[0].score}</span>/
                        <span>
                          {item.candidate_result_details[0].max_score}
                        </span>
                      </p>
                      <p>({item.candidate_result_details[0].result})</p>
                    </>
                  )}
                </td>
                <td>
                  {item.created_date && (
                    <p>
                      {t('time_do_test', { ns: 'statistic' })}:{' '}
                      <span>{formatTime(item.created_date)}</span>
                    </p>
                  )}
                  {item.candidate_result_details.length > 0 && (
                    <>
                      {item.candidate_result_details[0]?.time_start && (
                        <p>
                          {t('start_at', { ns: 'statistic' })}:{' '}
                          <span>
                            {formatTime(
                              item.candidate_result_details[0]?.time_start,
                            )}
                          </span>
                        </p>
                      )}

                      {item.candidate_result_details[0]?.time_end && (
                        <p>
                          {t('end_at', { ns: 'statistic' })}:{' '}
                          <span>
                            {formatTime(
                              item.candidate_result_details[0]?.time_end,
                            )}
                          </span>
                        </p>
                      )}
                    </>
                  )}
                </td>
                <td>
                  <Link to={`/result/${item.id}`}>
                    <Button>{t('bt_result', { ns: 'statistic' })}</Button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListIndex;
