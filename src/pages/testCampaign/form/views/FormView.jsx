import { Breadcrumb, Button, Col, Modal, Row, Steps } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SettingTestCampaigns from 'shares/testCampaign/SettingTestCampaigns';
import {
  testCampaignFormSelector,
  createTestCampaign,
} from 'slices/testCampain/testCampaignForm';
import SelectTest from './SelectTest';
const { Step } = Steps;

const FormView = () => {
  const { t } = useTranslation('testCampaign');
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const {
    item: { exam_id },
  } = useSelector(testCampaignFormSelector);

  const steps = [
    {
      title: t('Select_test', { ns: 'testCampaign' }),
      content: <SelectTest />,
      description: t('Exam_cannot_be_changed_after_the_exam_is_created', {
        ns: 'testCampaign',
      }),
    },
    {
      title: t('Setting', { ns: 'testCampaign' }),
      content: <SettingTestCampaigns />,
      description: t('Exam_name_access_code_time', { ns: 'testCampaign' }),
    },
    {
      title: t('Preview', { ns: 'testCampaign' }),
      description: t('See_how_the_contest_has_been_created', {
        ns: 'testCampaign',
      }),
    },
  ];

  const modalError = () => {
    Modal.error({
      content: t('Please_select_a_test_to_continue', { ns: 'testCampaign' }),
      maskClosable: true,
    });
  };

  const handleContinue = () => {
    if (exam_id) {
      setCurrent(current + 1);
    } else {
      modalError();
    }
  };

  return (
    <div className='container'>
      <Row gutter={[24, 24]} className='create_campaign'>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/test-campaigns'>
                <span>{t('test_campaign', { ns: 'testCampaign' })}</span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {t('test_campaign', { ns: 'testCampaign' })}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={24}>
          <Steps current={current} className='p-4 white-bg' type='navigation'>
            {steps.map((item) => (
              <Step
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </Steps>
        </Col>
        <Col span={24}>
          <div className='steps-content'>{steps[current].content}</div>
        </Col>
        <Col span={24}>
          <div className='steps-action'>
            {current === 0 && (
              <Row gutter={[16, 16]} justify='end'>
                <Col>
                  <Link to='/test-campaigns'>
                    <Button>{t('cancel', { ns: 'testCampaign' })}</Button>
                  </Link>
                </Col>
                <Col>
                  <Button onClick={handleContinue} type='primary'>
                    {t('continue', { ns: 'testCampaign' })}
                  </Button>
                </Col>
              </Row>
            )}
            {current === 1 && (
              <Row gutter={[16, 16]} justify='end'>
                <Col offset={13}>
                  <Link to='/test-campaigns'>
                    <Button>{t('cancel', { ns: 'testCampaign' })}</Button>
                  </Link>
                </Col>
                <Col>
                  <Button
                    type='primary'
                    onClick={() => dispatch(createTestCampaign())}
                  >
                    {t('Public', { ns: 'testCampaign' })}
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FormView;
