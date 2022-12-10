import { Collapse, DatePicker, Select, Space, Col, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  testCampaignFormSelector,
  setLimitTime,
} from 'slices/testCampain/testCampaignForm';

const { RangePicker } = DatePicker;

const AvailableTest = (props) => {
  const { t } = useTranslation('testCampaign');
  const dispatch = useDispatch();
  const {
    item: { time_limit },
  } = useSelector(testCampaignFormSelector);
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const [renderTime, setRenderTime] = useState(
    t('Unlimited', { ns: 'testCampaign' }),
  );

  const onChange = (dates, dateStrings) => {
    setRenderTime(`${dateStrings[0]} - ${dateStrings[1]}`);
    dispatch(setLimitTime(dateStrings));
  };

  return (
    <div>
      <Collapse ghost expandIconPosition='end'>
        <Collapse.Panel
          header={t('Available', { ns: 'testCampaign' })}
          key='1'
          extra={renderTime !== undefined ? renderTime : null}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <p>
                {t(
                  'If_the_available_time_is_not_selected_the_test_campaign_will_have_an_unlimited_available_time',
                  { ns: 'testCampaign' },
                )}
              </p>
            </Col>
            <Col span={24}>
              <RangePicker
                showTime
                format={dateFormat}
                value={time_limit.map((item) => moment(item))}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default AvailableTest;
