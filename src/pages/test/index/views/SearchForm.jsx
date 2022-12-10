import { Col, Input, Row, Select, Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  testIndexSelector,
  onSearch,
  onChangeSubject,
  showDialog,
} from 'slices/test/testIndex';
import { PlusCircleOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option, OptGroup } = Select;

const SearchForm = () => {
  const { t } = useTranslation('test');
  const dispatch = useDispatch();
  const handleChange = () => {};
  const [keyword, setKeyword] = useState('');
  const { category } = useSelector(testIndexSelector);
  return (
    <Row gutter={24} align='middle' justify='start' className='mb-1'>
      <Col span={8}>
        <Search
          className='search-btn'
          size='large'
          placeholder={t('enter_keyword_to_search_tests', { ns: 'test' })}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={(values) => dispatch(onSearch(values))}
        />
      </Col>
      <Col span={8}>
        <Select
          defaultValue=''
          onChange={(values) =>
            dispatch(
              onChangeSubject({ targetSubject: values, keyword: keyword }),
            )
          }
          className='select'
          size='large'
        >
          <Option value={''}>All</Option>
          {category.map((item) => (
            <OptGroup label={item.name} key={item.id}>
              {item?.subjects.map((sub) => (
                <Option value={sub.id} key={sub.id}>
                  {sub.name}
                </Option>
              ))}
            </OptGroup>
          ))}
        </Select>
      </Col>
      <Col span={8} className='d-flex justify-content-end'>
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
  );
};

export default SearchForm;
