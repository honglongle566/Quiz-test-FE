import { Button, Col, Pagination, Progress, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ListIndex = () => {
  const { t } = useTranslation('statistic');
  const [page, setPage] = useState(1);
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
                <th></th>
              </tr>
            </thead>
            <tbody className='ant-table-tbody'>
              <tr>
                <td>Toán</td>
                <td className='text-center'>
                  <span>_</span>
                </td>
                <td>
                  <Progress percent={50} />
                </td>
                <td>5</td>
                <td>00:03:11</td>
                <td>
                  <Link to={`/test-campaigns/$id}/result`}>
                    <Button>{t('bt_result', { ns: 'statistic' })}</Button>
                  </Link>
                </td>
              </tr>
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
