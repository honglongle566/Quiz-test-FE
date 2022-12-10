import { Col, Collapse, Form, Input, InputNumber, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccessCodeLink from './AccessCodeLink';
import AvailableTest from './AvailableTest';
import RequiredInformation from './RequiredInformation';
import { useDispatch, useSelector } from 'react-redux';
import {
  testCampaignFormSelector,
  setName,
  setDescription,
  setPassMark,
} from 'slices/testCampain/testCampaignForm';

const SettingTestCampaigns = () => {
  const { t } = useTranslation('testCampaign');
  const dispatch = useDispatch();
  const {
    exams,
    item: { exam_id, name, code_type, pass_mark, code_room, description },
  } = useSelector(testCampaignFormSelector);
  const [renderSettingPassMark, setRenderSettingPassMark] = useState(pass_mark);

  const onChangePassMark = (value) => {
    setRenderSettingPassMark(value);
    dispatch(setPassMark(value));
  };

  return (
    <Row gutter={[24, 24]} className='ma-0'>
      <Col span={12} className=''>
        <div className='white-bg p-4'>
          <Form layout='vertical'>
            <Form.Item
              label={t('Name_of_Test_campaign', { ns: 'testCampaign' })}
              required='true'
            >
              <Input
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
                placeholder={t('Enter_name', { ns: 'testCampaign' })}
              />
            </Form.Item>
            <Form.Item label={t('Introduction', { ns: 'testCampaign' })}>
              <Input.TextArea
                value={description}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                rows={6}
                placeholder={t('Enter_introduction', { ns: 'testCampaign' })}
              />
              {t('This_field_is_shown_when_user_do_the_test', {
                ns: 'testCampaign',
              })}
            </Form.Item>
          </Form>
          <p>{t('The_exam_has_been_selected', { ns: 'testCampaign' })}</p>
          <b>{exams && exams.find((item) => item.id === exam_id)?.name}</b>
        </div>
      </Col>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <AccessCodeLink />
          </Col>
          <Col span={24}>
            <div className='white-bg'>
              <AvailableTest />
            </div>
          </Col>
          <Col span={24}>
            <RequiredInformation />
          </Col>
          <Col span={24}>
            <Collapse ghost className='white-bg' expandIconPosition='end'>
              <Collapse.Panel
                header={t('Setting_pass_mark', { ns: 'testCampaign' })}
                key='1'
                extra={
                  renderSettingPassMark !== undefined
                    ? `${renderSettingPassMark}%`
                    : null
                }
              >
                <Form layout='vertical'>
                  <Form.Item label={t('Pass_Mark', { ns: 'testCampaign' })}>
                    <InputNumber
                      addonAfter='%'
                      step='1'
                      min={0}
                      max={100}
                      value={pass_mark}
                      onChange={onChangePassMark}
                    />
                  </Form.Item>
                </Form>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SettingTestCampaigns;
