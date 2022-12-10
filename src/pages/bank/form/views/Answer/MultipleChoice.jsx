import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Row } from 'antd';
import TinyMCE from 'shares/common/TinyMCE';
import { useTranslation } from 'react-i18next';
import { getLetter } from 'utils/utils';
import {
  setAnswerMul,
  setCorrectAnswersMul,
  bankFormSliceSelector,
} from 'slices/bank/bankForm';
import { useDispatch, useSelector } from 'react-redux';

const MultipleChoice = () => {
  const { t } = useTranslation('bank');
  const dispatch = useDispatch();
  const {
    item: { answer_mul, correct_answers_mul },
  } = useSelector(bankFormSliceSelector);

  const handleDeleteAnswer = (answer) => {
    let count = 0;
    let deleteAnswers = [];
    for (let item of answer_mul) {
      if (item.id !== answer.id) {
        deleteAnswers.push({ ...item, id: getLetter(count) });
        count++;
      }
    }
    dispatch(setAnswerMul(deleteAnswers));
    if (correct_answers_mul.includes(answer.id)) {
      dispatch(
        setCorrectAnswersMul(filterAnswerCor(answer.id, correct_answers_mul)),
      );
    }
  };

  const filterAnswerCor = (answer, arrayCor) => {
    return arrayCor
      .filter((x) => x !== answer)
      .map((a) => {
        if (a.charCodeAt(0) > answer.charCodeAt(0))
          return String.fromCharCode(a.charCodeAt(0) - 1);
        return a;
      });
  };

  const handleAddAnswer = () => {
    dispatch(
      setAnswerMul([
        ...answer_mul,
        { id: getLetter(answer_mul.length), content: '' },
      ]),
    );
  };
  const handleCheckAnswer = (answer) => {
    if (correct_answers_mul.includes(answer.id)) {
      return dispatch(
        setCorrectAnswersMul(
          correct_answers_mul.filter((item) => item !== answer.id),
        ),
      );
    }
    dispatch(setCorrectAnswersMul([...correct_answers_mul, answer.id]));
  };

  const handleAnswer = (answer) => {
    dispatch(
      setAnswerMul(
        answer_mul.map((item) => {
          if (item.id === answer.id) return answer;
          return item;
        }),
      ),
    );
  };

  return (
    <Col span={24}>
      <div className='white-bg p-4'>
        <h6>{t('Enter_the_answer', { ns: 'bank' })}</h6>
        {answer_mul.map((answer) => (
          <Row
            gutter={[8, 8]}
            align='middle'
            wrap={false}
            className='mb-3'
            key={answer.id}
          >
            <Col span={1}>
              <Checkbox
                checked={correct_answers_mul.includes(answer.id)}
                onChange={() => handleCheckAnswer(answer)}
              />
            </Col>
            <Col span={1}>
              <b> {answer.id.toUpperCase()} </b>
            </Col>
            <Col span={21}>
              <TinyMCE value={answer} onChange={handleAnswer} type='answer' />
            </Col>
            <Col span={1}>
              <Button type='text' onClick={() => handleDeleteAnswer(answer)}>
                <CloseCircleOutlined />
              </Button>
            </Col>
          </Row>
        ))}
        <Row>
          <Col flex={1}>
            <Button onClick={handleAddAnswer}>
              <PlusOutlined /> {t('Add_answer', { ns: 'bank' })}
            </Button>
          </Col>
          <Col>
            (*) {t('Choose_the', { ns: 'bank' })}{' '}
            <b>{t('correct_answer', { ns: 'bank' })}</b>{' '}
            {t('by_clicking_on_the_checkbox', { ns: 'bank' })}
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default MultipleChoice;
