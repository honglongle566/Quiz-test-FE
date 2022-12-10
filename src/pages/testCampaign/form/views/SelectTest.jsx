import { CalendarOutlined, FolderOutlined } from '@ant-design/icons';
import { Col, Input, Radio, Row, Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  testCampaignFormSelector,
  onChangeSubject,
  setExamId,
  onSearch,
} from 'slices/testCampain/testCampaignForm';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from 'utils/utils';
const { Search } = Input;
const { Option, OptGroup } = Select;

const SelectTest = () => {
  const { t } = useTranslation('testCampaign');
  const dispatch = useDispatch();
  const {
    exams,
    category,
    keyword,
    targetSubject,
    item: { exam_id },
  } = useSelector(testCampaignFormSelector);
  const [currentKeyword, setCurrentKeyword] = useState(keyword);

  return (
    <>
      <div className='p-4 select_test white-bg'>
        <Row gutter={[8, 8]}>
          <Col flex={1}>
            <h6 className='font_weight_bold'>
              {t('Choose_a_test', { ns: 'testCampaign' })}{' '}
            </h6>
          </Col>
          <Col span={6}>
            <Search
              className='search-btn'
              size='large'
              placeholder={t('Search_the_test', { ns: 'testCampaign' })}
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
              onSearch={(values) => dispatch(onSearch(values))}
            />
          </Col>
          <Col span={6}>
            <Select
              defaultValue={''}
              value={targetSubject}
              className='select'
              onChange={(values) =>
                dispatch(
                  onChangeSubject({
                    targetSubject: values,
                    keyword: currentKeyword,
                  }),
                )
              }
              size='large'
              style={{ width: '100%' }}
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
          <Col span={24}>
            <Radio.Group
              onChange={(e) => dispatch(setExamId(e.target.value))}
              value={exam_id}
              className='d-flex flex-column'
            >
              {exams.map((item) => (
                <Radio value={item.id} key={item.id}>
                  <p>{item.name}</p>
                  <p>
                    <CalendarOutlined className='mr-1' />
                    {formatDate(item.created_date)}
                    <FolderOutlined className='ml-2 mr-1' />
                    {item?.subject?.name}
                  </p>
                </Radio>
              ))}
            </Radio.Group>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SelectTest;
