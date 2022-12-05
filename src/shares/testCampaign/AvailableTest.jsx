import { Collapse, DatePicker, Select, Space, Col, Row } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

moment().format('MMMM Do YYYY, h:mm:ss a');

function AvailableTest(props) {
  const { t } = useTranslation('testCampaign');

  const [renderTime, setRenderTime] = useState(
    t('Unlimited', { ns: 'testCampaign' }),
  );

  const children = [];

  function handleChange(value) {
    //console.log(`selected ${value}`);
  }

  function onChange(dates, dateStrings) {
    //console.log('From: ', dates[0], ', to: ', dates[1]);
    //console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    setRenderTime(`${dateStrings[0]} - ${dateStrings[1]}`);
  }

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
              <Space direction='vertical' dateRender={{ currentDate: moment }}>
                <DatePicker.RangePicker
                  ranges={{
                    Today: [moment(), moment()],
                    'This Month': [
                      moment().startOf('month'),
                      moment().endOf('month'),
                    ],
                  }}
                  showTime
                  format='YYYY/MM/DD HH:mm:ss'
                  onChange={onChange}
                />
              </Space>
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default AvailableTest;
