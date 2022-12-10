import { Checkbox, Col, Collapse, Row } from 'antd';
import React, { useState } from 'react';
import { RequiredInformationType, renderExtra } from 'utils/utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  testCampaignFormSelector,
  setRequireInfo,
} from 'slices/testCampain/testCampaignForm';
import { useEffect } from 'react';

const RequiredInformation = (props) => {
  const { t } = useTranslation('testCampaign');
  const dispatch = useDispatch();
  const { requireInfo } = useSelector(testCampaignFormSelector);

  const [valueExtra, setValueExtra] = useState([
    {
      status: false,
      name: t('Fullname', { ns: 'testCampaign' }),
    },
    {
      status: false,
      name: t('Email', { ns: 'testCampaign' }),
    },
    {
      status: false,
      name: t('Phone', { ns: 'testCampaign' }),
    },
    {
      status: false,
      name: t('Group', { ns: 'testCampaign' }),
    },
    {
      status: false,
      name: t('ID', { ns: 'testCampaign' }),
    },
  ]);
  useEffect(() => {
    onChangeExtra(requireInfo);
  }, []);
  const onChangeExtra = (checkedValues) => {
    for (let i = 0; i < valueExtra.length; i++) {
      if (checkedValues.indexOf(i) !== -1) {
        setValueExtra((prev) => {
          prev[i].status = true;
          return [...prev];
        });
      } else if (checkedValues.indexOf(i) === -1) {
        setValueExtra((prev) => {
          prev[i].status = false;
          return [...prev];
        });
      }
    }
  };
  const handleChangeRequiredInfo = (checkedValues) => {
    dispatch(setRequireInfo(checkedValues));
    onChangeExtra(checkedValues);
  };

  return (
    <>
      <Collapse ghost className='white-bg' expandIconPosition='end'>
        <Collapse.Panel
          header={t('Required_information', { ns: 'testCampaign' })}
          key='1'
          extra={renderExtra(valueExtra).join(', ')}
        >
          <Checkbox.Group
            onChange={handleChangeRequiredInfo}
            value={requireInfo}
          >
            <Row gutter={[16, 16]}>
              <Col span={7}>
                <Checkbox value={0}>
                  {t('Fullname', { ns: 'testCampaign' })}
                </Checkbox>
              </Col>
              <Col span={7}>
                <Checkbox value={1}>
                  {t('Email', { ns: 'testCampaign' })}
                </Checkbox>
              </Col>
              <Col span={7}>
                <Checkbox value={2}>
                  {t('Phone', { ns: 'testCampaign' })}
                </Checkbox>
              </Col>
              <Col span={7}>
                <Checkbox value={3}>
                  {t('Group', { ns: 'testCampaign' })}
                </Checkbox>
              </Col>
              <Col span={7}>
                <Checkbox value={4}>{t('ID', { ns: 'testCampaign' })}</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

export default RequiredInformation;
