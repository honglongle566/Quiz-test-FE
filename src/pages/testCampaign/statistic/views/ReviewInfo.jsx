import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  Modal,
  Pagination,
  Progress,
  Row,
  Select,
  Space,
} from 'antd';
import { ArcElement, Chart as ChartJS, Legend } from 'chart.js';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { statisticAllSelector } from 'slices/statistic/statisticAll';
import { useSelector } from 'react-redux';

const ReviewInfo = (props) => {
  const { t } = useTranslation('testCampaign');
  const { listTestCamapain } = useSelector(statisticAllSelector);
  return (
    <div className='result_campaign container'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/test-campaigns'>
                <span>{t('test_campaign', { ns: 'testCampaign' })}</span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {t('The_test_campaign_result', { ns: 'testCampaign' })}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <Space direction='vertical' size='middle'>
            <Row gutter={[16, 16]} className='details'>
              <Col span={24}>
                <Row gutter={[8, 8]} align='middle'>
                  <Col flex={1}>
                    <h6>Đợt thi</h6>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <div className='white-bg p-4'>
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          {t('INFORMATION_CONTESTANTS', {
                            ns: 'testCampaign',
                          })}
                        </th>
                        <th>% HOÀN THÀNH ĐÚNG TRUNG BÌNH</th>
                        <th>{t('SCORE', { ns: 'testCampaign' })}</th>
                        <th>{t('DURATION', { ns: 'testCampaign' })}</th>
                        <th>{t('CREATED_AT', { ns: 'testCampaign' })}</th>
                      </tr>
                      {listTestCamapain &&
                        listTestCamapain.map((item) => (
                          <tr>
                            <td>{item.name}</td>
                            <td>
                              {item.candidate_result_details[0].length ? (
                                <Progress
                                  percent={
                                    item.candidate_result_details[0].result || 0
                                  }
                                />
                              ) : (
                                '_'
                              )}
                            </td>
                            <td>
                              {item.candidate_result_details[0].length && (
                                <>{item.candidate_result_details[0].score}</>
                              )}
                            </td>
                            <td>10:00:10</td>
                            <td>11/02/2033</td>
                            <td></td>
                            <td>
                              <Link to='/test-campaigns/:id/result'>
                                <Button>
                                  {t('View_Detail', { ns: 'testCampaign' })}
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewInfo;
