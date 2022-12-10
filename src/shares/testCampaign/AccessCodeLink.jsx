import { Col, Collapse, Input, Radio, Row } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  testCampaignFormSelector,
  setCodeType,
  setCodeRoom,
} from 'slices/testCampain/testCampaignForm';

const AccessCodeLink = (props) => {
  const { t } = useTranslation('testCampaign');
  const dispatch = useDispatch();
  const {
    item: { code_type, code_room },
  } = useSelector(testCampaignFormSelector);

  const [extraTip, setExtraTip] = useState(
    t('Public_Link', { ns: 'testCampaign' }),
  );

  const onChange = (e) => {
    dispatch(setCodeType(e.target.value));
    onChangeExtraTip();
  };
  const onChangeExtraTip = () => {
    if (code_type === 1) {
      setExtraTip(t('Password', { ns: 'testCampaign' }));
    } else {
      setExtraTip(t('Public_Link', { ns: 'testCampaign' }));
    }
  };
  useEffect(() => {
    onChangeExtraTip();
  }, []);

  return (
    <div>
      <Collapse ghost className='white-bg' expandIconPosition='end'>
        <Collapse.Panel
          header={t('Access_code_link', { ns: 'testCampaign' })}
          key='1'
          extra={extraTip}
        >
          <Row gutter={[16, 16]}>
            <Col>
              <Radio.Group
                onChange={onChange}
                value={code_type}
                defaultValue={0}
              >
                <Radio value={1}>{t('Password', { ns: 'testCampaign' })}</Radio>
                <Radio value={0}>
                  {t('Public_Link', { ns: 'testCampaign' })}
                </Radio>
              </Radio.Group>
            </Col>
            <Col>
              {code_type === 1 ? (
                <Row gutter={[8, 8]}>
                  <Col>
                    <p>
                      {t(
                        'Enter_the_unique_code_that_is_shared_by_all_candidates',
                        {
                          ns: 'testCampaign',
                        },
                      )}
                    </p>
                  </Col>
                  <Col span={24}>
                    <Input
                      onChange={(e) => dispatch(setCodeRoom(e.target.value))}
                      value={code_room}
                      placeholder={t('Enter_code', { ns: 'testCampaign' })}
                    />
                  </Col>
                </Row>
              ) : (
                <p>
                  {t('Everyone_has_access_to_the_link_and_does_the_test', {
                    ns: 'testCampaign',
                  })}
                </p>
              )}
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default AccessCodeLink;
