import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import Xarrow from 'react-xarrows';
import { useDispatch, useSelector } from 'react-redux';
import { updateListAnswer, doTestSelector } from 'slices/doTest/doTest';

const Matching = ({ data }) => {
  const [chooseAnswer, setChooseAnswer] = useState({});
  const dispatch = useDispatch();
  const { listAnswers } = useSelector(doTestSelector);
  const handleChooseAnswer = (questionID, answerID) => {
    let newAnswer = {
      ...chooseAnswer,
      [`${questionID}+${answerID}`]: !chooseAnswer[`${questionID}+${answerID}`],
    };
    setChooseAnswer(newAnswer);
    dispatch(
      updateListAnswer({
        index: data.index,
        answer: convertChooseAnswer(newAnswer),
      }),
    );
  };

  const convertChooseAnswer = (answer) => {
    let newAnswer = {};
    for (const [key, value] of Object.entries(answer)) {
      let listKey = key.split('+');
      if (value && newAnswer[listKey[0]]?.length) {
        newAnswer[listKey[0]] = [...newAnswer[listKey[0]], listKey[1]];
      } else if (value) {
        newAnswer[listKey[0]] = [listKey[1]];
      }
    }
    return newAnswer;
  };

  useEffect(() => {
    const questions = [...data?.matching_answers?.questions];
    const answers = [...data?.matching_answers?.answers];
    const oldAnswer = listAnswers[data.index] || {};
    let newAnswer = {};
    for (let question of questions) {
      for (let answer of answers) {
        if (
          oldAnswer[question.id] &&
          oldAnswer[question.id].includes(answer.id)
        ) {
          newAnswer = { ...newAnswer, [`${question.id}+${answer.id}`]: true };
        } else {
          newAnswer = { ...newAnswer, [`${question.id}+${answer.id}`]: false };
        }
      }
    }
    setChooseAnswer(newAnswer);
  }, []);

  return (
    <div>
      <Row gutter={[24, 24]} className='question-matching'>
        <Col span={24}>
          <div
            className='mb-3'
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
          <Row>
            <Col className='questions' span={12}>
              {data?.matching_answers?.questions.map((question) => (
                <div className='questions__box' key={question.id}>
                  <div className='questions__box__item'>
                    <div className='questions__box__item__content'>
                      <span>
                        <strong>{question.id}.</strong>
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: question.content,
                        }}
                      ></span>
                    </div>
                    <div className='questions__box__item__circle'>
                      <div
                        id={`${data.index}-${question.id}`}
                        className='questions__box__item__circle__icon'
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </Col>
            <Col className='answers' span={12}>
              {data?.matching_answers?.answers.map((answer) => (
                <div className='answers__box' key={answer.id}>
                  <div className='answers__box__item'>
                    <div className='answers__box__item__circle'>
                      <div
                        id={`${data.index}-${answer.id}`}
                        className='answers__box__item__circle__icon'
                      ></div>
                    </div>
                    <div className='answers__box__item__content'>
                      <span>
                        <strong>{answer.id.toUpperCase()}.</strong>
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: answer.content,
                        }}
                      ></span>
                    </div>
                    {data.matching_answers.questions.map((question) => (
                      <Xarrow
                        key={`${question.id}+${answer.id}`}
                        start={`${data.index}-${question.id}`}
                        end={`${data.index}-${answer.id}`}
                        path='straight'
                        strokeWidth={
                          chooseAnswer[`${question.id}+${answer.id}`] ? 2 : 0
                        }
                        headSize={4}
                        color='#2c4a9f'
                        showHead={chooseAnswer[`${question.id}+${answer.id}`]}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <div className='mb-1'>
            <strong>Trả lời</strong>
          </div>
          <div className='list-answer'>
            {data?.matching_answers?.questions.map((question) => (
              <div className='list-answer__box' key={question.id}>
                <div className='mr-2'>
                  <strong>{question.id}.</strong>
                </div>
                <div>
                  {data?.matching_answers?.answers.map((answer) => (
                    <Button
                      type='primary'
                      ghost
                      className={
                        chooseAnswer[`${question.id}+${answer.id}`]
                          ? 'btn-outline btn-answer active mr-3'
                          : 'btn-outline btn-answer mr-3'
                      }
                      key={answer.id}
                      onClick={() => handleChooseAnswer(question.id, answer.id)}
                    >
                      {answer.id.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Matching;
