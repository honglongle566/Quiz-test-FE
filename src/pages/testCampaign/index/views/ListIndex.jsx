import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Button, Col, message, Modal, Row, Switch, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { testCampaignIndexSelector } from 'slices/testCampain/testCampaignIndex';
const ListIndex = () => {
  const { t } = useTranslation('testCampaign');
  const { list } = useSelector(testCampaignIndexSelector);
  const onChange = (checked) => {
    message.success(t('Update_status_successfully', { ns: 'testCampaign' }));
  };

  const showModalDelete = () => {
    Modal.confirm({
      title: t('Notification', { ns: 'testCampaign' }),
      icon: <ExclamationCircleOutlined />,
      content: t('notifi_delete', { ns: 'testCampaign' }),
      okText: t('yes', { ns: 'testCampaign' }),
      cancelText: t('no', { ns: 'testCampaign' }),
      onOk() {
        //console.log('delete')
      },
      maskClosable: true,
    });
  };

  return (
    <div className='mt-3'>
      {list.map((item) => (
        <Row
          gutter={[24, 24]}
          justify='space-between'
          align='middle'
          className='bg-white box-radius pa-2 mb-3 ma-0'
        >
          <Col flex={1}>
            <h5 dangerouslySetInnerHTML={{ __html: item.name }}></h5>
            <div>
              <span className='mr-2'>
                <CalendarOutlined />{' '}
                {t('Unlimited_Time', { ns: 'testCampaign' })}
              </span>
              <a
                href={`http://localhost:8080/info-collect/${item.link_room_exam}`}
                target='_blank'
              >
                <LinkOutlined />
                {`http://localhost:8080/info-collect/${item.link_room_exam}`}
              </a>
            </div>
          </Col>
          <Col offset={2}>
            <Tooltip placement='top' title={t('edit', { ns: 'testCampaign' })}>
              <Link to={`/test-campaigns/${item.id}/edit`}>
                <Button type='text'>
                  <EditOutlined />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip
              placement='top'
              title={t('delete', { ns: 'testCampaign' })}
            >
              <Button type='text' danger onClick={showModalDelete}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
            <Switch className='mr-2' defaultChecked onChange={onChange} />
            <Link to={`/test-campaigns/:id/question-statistic`}>
              <Button>{t('result', { ns: 'testCampaign' })}</Button>
            </Link>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default ListIndex;
