import {
  LinkOutlined,
  ProjectOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SettingTestCampaigns from 'shares/testCampaign/SettingTestCampaigns';
import { onchangeRouterLink } from 'slices/core/appState';
import {
  testCampaignReviewSelector,
  updateTestCampaign,
} from 'slices/testCampain/testCampaignReview';
import { formatDate } from 'utils/utils';

const ReviewInfo = (props) => {
  const { t } = useTranslation('testCampaign');
  const dispatch = useDispatch();

  const [renderSetting, setRenderSetting] = useState(false);
  const { test } = useSelector(testCampaignReviewSelector);

  const onClickSetting = () => {
    setRenderSetting(true);
  };

  return (
    <div className='preview container'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/test-campaigns'>
                {t('test_campaign', { ns: 'testCampaign' })}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{test.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        {!renderSetting ? (
          <>
            <Col span={24}>
              <Row gutter={[8, 8]} align='middle'>
                <Col flex={1}>
                  <h4>{test.name}</h4>
                </Col>
                <Col>
                  <Button type='primary' onClick={onClickSetting}>
                    <SettingOutlined /> {t('Setting', { ns: 'testCampaign' })}
                  </Button>
                </Col>
                <Col>
                  <Link to={`/test-campaigns/${test.name}/result`}>
                    <Button>
                      <ProjectOutlined />{' '}
                      {t('View_Resul', { ns: 'testCampaign' })}
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>

            <Col span={10}>
              <div className='white-bg p-4'>
                <Row gutter={[8, 8]} align='middle' className='ma-0'>
                  <Col flex={1}>
                    <h6>
                      {t('Test_campaign_information', { ns: 'testCampaign' })}
                    </h6>
                  </Col>
                  <Col>
                    <p>{t('Active', { ns: 'testCampaign' })}</p>
                  </Col>
                  <Col span={24}>
                    <p>{t('LINK_TEST_CAMPAIGN', { ns: 'testCampaign' })}</p>
                  </Col>
                  <Col span={20}>
                    <a
                      href={`http://localhost:8080/info-collect/${test.link_room_exam}`}
                      target='blank'
                    >
                      <LinkOutlined />
                      {`http://localhost:8080/info-collect/${test.link_room_exam}`}
                    </a>
                  </Col>
                  <Col span={12}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <p>{t('DESCRIPTION', { ns: 'testCampaign' })}</p>
                        <p>{test.description}</p>
                      </Col>
                      <Col span={24}>
                        <p>{t('TEST', { ns: 'testCampaign' })}</p>
                        <a
                          onClick={() =>
                            dispatch(
                              onchangeRouterLink(
                                `tests/${test?.exam?.id}/edit`,
                              ),
                            )
                          }
                        >
                          {test?.exam?.name}
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={14}>
              <div className='white-bg p-4'>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <h6>{t('Setting_Accessbility', { ns: 'testCampaign' })}</h6>
                  </Col>
                  <Col span={12}>
                    <p>{t('AVAILABLE', { ns: 'testCampaign' })}</p>
                    {test.time_limit?.length ? (
                      <span>
                        {test.time_limit
                          .map((time) => formatDate(time))
                          .join('~')}
                      </span>
                    ) : (
                      <span>{t('Unlimited', { ns: 'testCampaign' })}</span>
                    )}
                  </Col>
                  <Col span={12}>
                    <p>{t('ACCESS_CODE_LINK', { ns: 'testCampaign' })}</p>
                    {test.code_room ? (
                      <div>{test.code_room}</div>
                    ) : (
                      <div>{t('Public_Link', { ns: 'testCampaign' })}</div>
                    )}
                  </Col>
                  <Col span={12}>
                    <p>{t('Phone', { ns: 'testCampaign' })}</p>
                    {test.is_require_phone ? (
                      <div>Có</div>
                    ) : (
                      <div>{t('Public_Link', { ns: 'testCampaign' })}</div>
                    )}
                  </Col>
                  <Col span={12}>
                    <span>{t('Fullname', { ns: 'testCampaign' })}</span>
                    {test.is_require_full_name ? (
                      <div>Có</div>
                    ) : (
                      <div>{t('Public_Link', { ns: 'testCampaign' })}</div>
                    )}
                  </Col>
                  <Col span={12}>
                    <p>Email</p>
                    {test.is_require_email ? (
                      <div>Có</div>
                    ) : (
                      <div>{t('Public_Link', { ns: 'testCampaign' })}</div>
                    )}
                  </Col>
                  <Col span={12}>
                    <span>Nhóm</span>
                    {test.is_require_group ? (
                      <div>Có</div>
                    ) : (
                      <div>{t('Public_Link', { ns: 'testCampaign' })}</div>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <Link to='/test-campaigns'>
                <Button>{t('cancel', { ns: 'testCampaign' })} </Button>
              </Link>
            </Col>
          </>
        ) : (
          <>
            <Col span={24}>
              <Row gutter={[8, 8]} align='middle'>
                <Col flex={1}>
                  <h4>{t('Required_information', { ns: 'testCampaign' })}</h4>
                </Col>
                <Col>
                  <Button
                    type='primary'
                    ghost
                    className='mr-3'
                    onClick={() => onchangeRouterLink(`/test-campaigns`)}
                  >
                    Hủy
                  </Button>
                  <Button
                    type='primary'
                    onClick={() => dispatch(updateTestCampaign())}
                  >
                    Cập nhật
                  </Button>
                </Col>
              </Row>
            </Col>
            <SettingTestCampaigns />
          </>
        )}
      </Row>
    </div>
  );
};

export default ReviewInfo;
