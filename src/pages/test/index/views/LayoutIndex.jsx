import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { showDialog } from 'slices/test/testIndex';
import ConfirmDialog from './ConfirmDialog';
import ListIndex from './ListIndex';
import SearchForm from './SearchForm';

const LayoutIndex = () => {
  const { t } = useTranslation('test');
  const dispatch = useDispatch();
  return (
    <div>
      <Row justify='space-between' align='center' className='mb-3'>
        <Col>
          <Typography.Title level={3}>
            {t('tests', { ns: 'test' })}
          </Typography.Title>
        </Col>
        <Col>
          <Button
            type='primary'
            size='large'
            icon={<PlusCircleOutlined />}
            onClick={() => dispatch(showDialog())}
          >
            {t('create_new_test', { ns: 'test' })}
          </Button>
        </Col>
      </Row>
      <SearchForm />
      <ListIndex />
      <ConfirmDialog />
    </div>
  );
};

export default LayoutIndex;
