import { Button, Col, Pagination, Progress, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { statisticAllSelector } from 'slices/statistic/statisticAll';
import { useSelector } from 'react-redux';

const ListIndex = () => {
  const { t } = useTranslation('statistic');
  const [page, setPage] = useState(1);
  const { testCampain } = useSelector(statisticAllSelector);
  return (
    <Row gutter={[16, 16]} justify='center'>
      <Col span={24}>
        <div className='table-box'>
          <table>
            <thead className='ant-table-thead'>
              <tr>
                <th>{t('test_campaign_name', { ns: 'statistic' })}</th>
                <th>{t('completed_total', { ns: 'statistic' })}</th>
                <th>
                  {t('average_correct_completion_percent', {
                    ns: 'statistic',
                  })}
                </th>
                <th>{t('average_score', { ns: 'statistic' })}</th>
                <th>{t('average_duration', { ns: 'statistic' })}</th>
              </tr>
            </thead>
            <tbody className='ant-table-tbody'>
              {testCampain &&
                testCampain.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td className='text-center'>
                      <span>
                        {item.total_candidate_done}/{item.total_candidate}
                      </span>
                    </td>
                    <td>
                      <Progress
                        percent={Math.floor(
                          (item.total_candidate_done / item.total_candidate) *
                            100 || 0,
                        )}
                      />
                    </td>
                    <td>{item.score || 0}</td>
                    <td>{item.time === 'NaN:NaN:NaN' ? '_' : item.time}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Col>
      <Col className='pagination-bottom'>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          current={page}
          onChange={(values) => setPage(values)}
          total={20}
          // hideOnSinglePage
        />
      </Col>
    </Row>
  );
};

export default ListIndex;
