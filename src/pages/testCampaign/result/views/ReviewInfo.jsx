import {
  CheckOutlined,
  ExclamationCircleFilled,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  QrcodeOutlined,
  RocketOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Col, Divider, Progress, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import FillingBlankSpace from 'shares/result/question/FillingBlankSpace';
import Matching from 'shares/result/question/Matching';
import MultipleChoice from 'shares/result/question/MultipleChoice';
import TrueFalse from 'shares/result/question/TrueFalse';

import { useSelector } from 'react-redux';
import { testCampaignResultSelector } from 'slices/testCampain/testCampaignResult';
import { subDateTime } from 'utils/utils';

const ReviewInfo = () => {
  const { t } = useTranslation('statistic');
  const { resultData } = useSelector(testCampaignResultSelector);
  const showQuestion = (question, answers) => {
    if (question.type === 1) {
      return <MultipleChoice data={question} answers={answers} />;
    }
    if (question.type === 2) {
      return <TrueFalse data={question} answers={answers} />;
    }
    if (question.type === 3)
      return <Matching data={question} answers={answers} />;
    if (question.type === 4) {
      return <FillingBlankSpace data={question} answers={answers} />;
    }
  };

  return (
    <div className='results_statistic container'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/test-campaigns'>
                <span>{t('test_campaign_br', { ns: 'statistic' })}</span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/statistic/campaigns`}>
                <span>
                  {t('the_test_campaign_result', { ns: 'statistic' })}
                </span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{resultData.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className='white-bg p-4'>
                <h6>{resultData.name}</h6>
                {resultData.candidate?.phone && (
                  <p>
                    <PhoneOutlined /> {resultData.candidate.phone}
                  </p>
                )}
                {resultData.candidate?.email && (
                  <p>
                    <MailOutlined /> {resultData.candidate.email}
                  </p>
                )}
                {resultData.candidate?.group && (
                  <p>
                    <TeamOutlined /> {resultData.candidate.group}
                  </p>
                )}
                {resultData.candidate?.identify_code && (
                  <p>
                    <IdcardOutlined /> {resultData.candidate.identify_code}
                  </p>
                )}
                <Divider />
                <Row gutter={[8, 8]} className='result_test'>
                  <Col flex={1}>
                    <div className='point'>
                      <span>{resultData.score || 0}</span> /
                      {resultData.max_score || 0} ĐIỂM
                    </div>
                  </Col>
                  <Col></Col>
                  <Col span={24}>
                    <Row>
                      <Col span={14}>
                        <p>
                          {' '}
                          {t('completion_percentage', {
                            ns: 'statistic',
                          })}
                          :
                        </p>
                      </Col>
                      <Col span={10} className='d-flex'>
                        <span className='mr-2'>
                          {Math.floor(
                            (resultData.score / resultData.max_score) * 100 ||
                              0,
                          )}
                          %
                        </span>
                        <Progress
                          percent={Math.floor(
                            (resultData.score / resultData.max_score) * 100 ||
                              0,
                          )}
                          showInfo={false}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col flex={1}>
                        {t('total_correct_questions', { ns: 'statistic' })}
                      </Col>
                      <Col>
                        <span>
                          {resultData.total_right}/{resultData.total_question}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col flex={1}>{t('duration', { ns: 'statistic' })}</Col>
                      <Col>
                        <span>
                          {subDateTime(
                            resultData.time_start,
                            resultData.time_end,
                          )}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <div className='white-bg p-4'>
            <Row>
              <Col span={24} className='box-head-result'>
                <h6>{t('test_detail', { ns: 'statistic' })}</h6>
              </Col>
              <Col span={24}>
                {resultData?.details &&
                  resultData?.details?.map((question) => (
                    <div key={question.id}>
                      {showQuestion(question, question.examinee_answers)}
                      <Divider className='my-3' />
                    </div>
                  ))}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewInfo;
