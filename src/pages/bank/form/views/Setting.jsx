import { InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  bankFormSliceSelector,
  setGroupQuestion,
  setScore,
} from 'slices/bank/bankForm';

const { Option } = Select;

const Setting = () => {
  const { t } = useTranslation('bank');
  const dispatch = useDispatch();
  const {
    questionGroup,
    item: { score, group_question },
  } = useSelector(bankFormSliceSelector);

  return (
    <div className='white-bg p-4'>
      <h6>{t('Setting', { ns: 'bank' })}</h6>
      <div className='mb-2'>{t('Score_Of_Question', { ns: 'bank' })}:</div>
      <InputNumber
        min={1}
        max={100}
        value={score}
        onChange={(value) => dispatch(setScore(value))}
        style={{ width: '100%' }}
      />
      <div className='mb-2 mt-3'>{t('Question_group', { ns: 'bank' })}:</div>
      <Select
        showSearch
        placeholder={`-- ${t('Question_group', {
          ns: 'bank',
        })} --`}
        optionFilterProp='children'
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        value={group_question}
        onChange={(value) => dispatch(setGroupQuestion(value))}
        style={{ width: '100%' }}
      >
        {questionGroup.map((item) => (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Setting;
