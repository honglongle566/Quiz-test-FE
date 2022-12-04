import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from './ConfirmDialog';
import ListIndex from './ListIndex';
import SearchForm from './SearchForm';

const LayoutIndex = () => {
  const { t } = useTranslation('test');

  return (
    <div>
      <Row justify='space-between' align='center' className='mb-3'>
        <Col>
          <h6 className='ma-0 mb-2'>{t('tests', { ns: 'test' })}</h6>
        </Col>
      </Row>
      <SearchForm />
      <ListIndex />
      <ConfirmDialog />
    </div>
  );
};

export default LayoutIndex;
