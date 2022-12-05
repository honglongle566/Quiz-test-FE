import { Checkbox, Col, Collapse, Form, Input, InputNumber, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResultTestType } from 'utils/utils';
import AccessCodeLink from './AccessCodeLink';
import AvailableTest from './AvailableTest';
import RequiredInformation from './RequiredInformation';

const SettingTestCampaigns = (props) => {
  const { t } = useTranslation('testCampaign');

  const [form] = Form.useForm();

  const [formSettingPassMark] = Form.useForm();

  const [renderSettingPassMark, setRenderSettingPassMark] = useState();

  const [resultTest, setResultTest] = useState([
    [t('Score', { ns: 'testCampaign' })],
    [t('Pass_Not_Pass', { ns: 'testCampaign' })],
  ]);

  function onChangeCheckboxScore(checkedValues) {
    if (checkedValues.indexOf(1) >= 0 && checkedValues.indexOf(2) == -1) {
      setResultTest((prev) => {
        const b = (prev[0] = [t('Score', { ns: 'testCampaign' })]);
        return [b, prev[1]];
      });
    }
    if (checkedValues.indexOf(2) >= 0 && checkedValues.indexOf(1) == -1) {
      setResultTest((prev) => {
        const b = (prev[0] = [t('Complete_percent', { ns: 'testCampaign' })]);
        return [b, prev[1]];
      });
    }
    if (checkedValues.indexOf(1) >= 0 && checkedValues.indexOf(2) > -1) {
      setResultTest((prev) => {
        const b = (prev[0] = [
          t('Score', { ns: 'testCampaign' }),
          t('Complete_percent', { ns: 'testCampaign' }),
        ]);
        return [b, prev[1]];
      });
    }
    if (checkedValues.indexOf(1) == -1 && checkedValues.indexOf(2) == -1) {
      setResultTest((prev) => {
        const b = (prev[0] = []);
        return [b, prev[1]];
      });
    }
  }

  function onChangeCheckboxResult(checkedValues) {
    if (checkedValues.indexOf(3) >= 0 && checkedValues.indexOf(4) == -1) {
      setResultTest((prev) => {
        const b = (prev[1] = [t('Detail', { ns: 'testCampaign' })]);
        return [prev[0], b];
      });
    }
    if (checkedValues.indexOf(4) >= 0 && checkedValues.indexOf(3) == -1) {
      setResultTest((prev) => {
        const b = (prev[1] = [t('Pass_Not_Pass', { ns: 'testCampaign' })]);
        return [prev[0], b];
      });
    }
    if (checkedValues.indexOf(3) >= 0 && checkedValues.indexOf(4) > -1) {
      setResultTest((prev) => {
        const b = (prev[1] = [
          t('Detail', { ns: 'testCampaign' }),
          t('Pass_Not_Pass', { ns: 'testCampaign' }),
        ]);
        return [prev[0], b];
      });
    }
    if (checkedValues.indexOf(3) == -1 && checkedValues.indexOf(4) == -1) {
      setResultTest((prev) => {
        const b = (prev[1] = []);
        return [prev[0], b];
      });
    }
  }

  const extraResultTest = resultTest[0].concat(resultTest[1]).join(', ');

  function onChangePassMark(value) {
    setRenderSettingPassMark(value);
  }

  return (
    <>
      <Row gutter={[24, 24]} className='ma-0'>
        <Col span={12} className=''>
          <div className='white-bg p-4'>
            <Form form={form} layout='vertical'>
              <Form.Item
                label={t('Name_of_Test_campaign', { ns: 'testCampaign' })}
                required='true'
              >
                <Input placeholder={t('Enter_name', { ns: 'testCampaign' })} />
              </Form.Item>
              <Form.Item label={t('Introduction', { ns: 'testCampaign' })}>
                <Input.TextArea
                  rows={6}
                  placeholder={t('Enter_introduction', { ns: 'testCampaign' })}
                />
                {t('This_field_is_shown_when_user_do_the_test', {
                  ns: 'testCampaign',
                })}
              </Form.Item>
            </Form>
            <p>{t('The_exam_has_been_selected', { ns: 'testCampaign' })}</p>
            <p>test 2</p>
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
              <Collapse ghost className='white-bg' expandIconPosition='end'>
                <Collapse.Panel
                  header={t('Result_page', { ns: 'testCampaign' })}
                  key='1'
                  extra={extraResultTest}
                >
                  <Row gutter={[8, 8]}>
                    <Col span={4}>{t('Score', { ns: 'testCampaign' })}:</Col>
                    <Col span={20}>
                      <Checkbox.Group
                        onChange={onChangeCheckboxScore}
                        defaultValue={`${ResultTestType.score}`}
                      >
                        <Row gutter={[8, 8]}>
                          <Col span={24}>
                            <Checkbox value={ResultTestType.score}>
                              {t('Score', { ns: 'testCampaign' })}
                            </Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value={ResultTestType.complete_percent}>
                              {t('Complete_percent', { ns: 'testCampaign' })}
                            </Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Col>
                    <Col span={4}>{t('Result', { ns: 'testCampaign' })}:</Col>
                    <Col span={20}>
                      <Checkbox.Group
                        onChange={onChangeCheckboxResult}
                        defaultValue={`${ResultTestType.pass_or_not_pass}`}
                      >
                        <Row gutter={[8, 8]}>
                          <Col span={24}>
                            <Checkbox value={ResultTestType.detail}>
                              {t('Detail', { ns: 'testCampaign' })}
                            </Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value={ResultTestType.pass_or_not_pass}>
                              {t('Pass_Not_Pass', { ns: 'testCampaign' })}
                            </Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>
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
                  <Form form={formSettingPassMark} layout='vertical'>
                    <Form.Item label={t('Pass_Mark', { ns: 'testCampaign' })}>
                      <InputNumber
                        addonAfter='%'
                        step='1'
                        min={0}
                        max={100}
                        onChange={onChangePassMark}
                      />
                    </Form.Item>
                    <Form.Item
                      label={t('Passed_message', { ns: 'testCampaign' })}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                      label={t('Unpassed_message', { ns: 'testCampaign' })}
                    >
                      <Input />
                    </Form.Item>
                  </Form>
                </Collapse.Panel>
              </Collapse>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SettingTestCampaigns;
