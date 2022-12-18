import { Breadcrumb, Button, Col, Radio, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addQuestion,
  bankFormSliceSelector,
  setType,
  updateQuestion,
} from 'slices/bank/bankForm';
import Matching from './Answer/Matching';
import MultipleChoice from './Answer/MultipleChoice';
import TrueFalse from './Answer/TrueFalse';
import Explain from './Explain';
import Question from './Question/Question';
import QuestionFillingSpaces from './Question/QuestionFillingSpaces';
import Setting from './Setting';

const FormView = () => {
  const { t } = useTranslation('bank');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isPage,
    item: { type },
  } = useSelector(bankFormSliceSelector);

  const onChangeType = (e) => {
    dispatch(setType(e.target.value));
  };

  const handleCreateQuestion = () => {
    if (isPage === 'CREATE' || isPage === 'TEST_CREATE_QUESTION') {
      dispatch(addQuestion());
    } else {
      dispatch(updateQuestion());
    }
    navigate(-1);
  };

  return (
    <>
      <Row className='container mb-5' align='middle' justify='space-between'>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/bank'>{t('Question_bank', { ns: 'bank' })}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {isPage === 'CREATE' || isPage === 'TEST_CREATE_QUESTION'
                ? t('Create', { ns: 'bank' })
                : t('Update', { ns: 'bank' })}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>
          <Button type='primary' onClick={() => handleCreateQuestion()}>
            {isPage === 'CREATE' || isPage === 'TEST_CREATE_QUESTION'
              ? t('Create', { ns: 'bank' })
              : t('Update', { ns: 'bank' })}
          </Button>
          <Button className='ml-2'>
            <Link to='/bank'>{t('Back_to_Bank', { ns: 'bank' })}</Link>
          </Button>
        </Col>
      </Row>
      <Row className='create-question container mb-3'>
        <Col span={8} className='pr-2'>
          <Setting />
        </Col>
        <Col span={16} className='pl-2'>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className='white-bg p-4'>
                <h6>{t('Question_Type', { ns: 'bank' })}</h6>
                <Radio.Group
                  onChange={onChangeType}
                  value={type}
                  style={{
                    marginBottom: 8,
                  }}
                >
                  <Radio.Button value={1}>
                    {t('Multiple_Choice', { ns: 'bank' })}
                  </Radio.Button>
                  <Radio.Button value={2}>
                    {t('True_False', { ns: 'bank' })}
                  </Radio.Button>
                  <Radio.Button value={3}>
                    {t('Matching', { ns: 'bank' })}
                  </Radio.Button>
                  <Radio.Button value={4}>
                    {t('Filling_blank_spaces', { ns: 'bank' })}
                  </Radio.Button>
                </Radio.Group>
              </div>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]} className='multiple_choice'>
                {type === 4 ? <QuestionFillingSpaces /> : <Question />}
                {type === 1 && <MultipleChoice />}
                {type === 2 && <TrueFalse />}
                {type === 3 && <Matching />}
                <Explain />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default FormView;
