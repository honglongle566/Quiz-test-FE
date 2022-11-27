import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Col, Row, Select } from 'antd';
import Search from 'antd/lib/input/Search';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  onSearch,
  bankIndexSliceSelector,
  onChangeGroupQuestion,
} from 'slices/bank/bankIndex';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
const { Option } = Select;

const SearchForm = () => {
  const { t } = useTranslation('bank');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const { questionGroup } = useSelector(bankIndexSliceSelector);
  const handleCreateQuestion = () => {
    navigate(`/bank/create-question`);
  };

  return (
    <Row gutter={24} align='middle' justify='start' className='mb-1'>
      <Col span={8}>
        <Search
          className='search-btn'
          size='large'
          placeholder={t('Search_question', { ns: 'bank' })}
          defaultValue=''
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={(values) => dispatch(onSearch(values))}
        />
      </Col>
      <Col span={8}>
        <Select
          showSearch
          size='large'
          className='select'
          placeholder={t('Question_group', { ns: 'bank' })}
          optionFilterProp='children'
          filterOption={(input, option) =>
            option.children
              .toLocaleLowerCase()
              .includes(input.toLocaleLowerCase())
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          onChange={(values) =>
            dispatch(
              onChangeGroupQuestion({
                targetGroupQuestion: values,
                keyword: keyword,
              }),
            )
          }
        >
          <Option value='' key='0'>
            All
          </Option>
          {questionGroup.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={8} className='item-right'>
        <Button
          size='large'
          type='primary'
          icon={<PlusSquareOutlined />}
          onClick={handleCreateQuestion}
        >
          {t('New_question', { ns: 'bank' })}
        </Button>
      </Col>
    </Row>
  );
};

export default SearchForm;
