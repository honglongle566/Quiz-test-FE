import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { onSearch } from 'slices/category/categoryGroup';

const { Search } = Input;

const SearchForm = () => {
  const { t } = useTranslation('category');
  const dispatch = useDispatch();

  return (
    <Row justify='space-between' align='middle' className='mb-1'>
      <Col span={8}>
        <Search
          className='search-btn'
          size='large'
          placeholder={t('Search_test_campaign', { ns: 'testCampaign' })}
          onSearch={(values) => dispatch(onSearch(values))}
        />
      </Col>
      <Col span={8} className='item-right'>
        <Link to='create'>
          <Button type='primary' icon={<PlusCircleFilled />} size='large'>
            {t('Create_test_campaign', { ns: 'testCampaign' })}
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default SearchForm;
