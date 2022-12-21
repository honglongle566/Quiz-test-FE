import { Button, Col, Row } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Xarrow from 'react-xarrows';

const Matching = ({ data, answers = {} }) => {
  const [showArrow, setShowArrow] = useState(false);
  const showIconResult = (questionID) => {
    const dataCorrect = data.matching_correct[questionID] || [];
    const dataAnswer = answers[questionID] || [];
    if (dataCorrect.length != dataAnswer.length)
      return <CloseCircleFilled className='text-red' />;
    for (let i = 0; i < dataCorrect.length; i++) {
      if (dataCorrect[i] != dataAnswer[i])
        return <CloseCircleFilled className='text-red' />;
    }
    return <CheckCircleFilled className='text-green' />;
  };

  useEffect(() => {
    setShowArrow(true);
  }, []);

  return (
    <div>
      <span className='question_order'>CÂU HỎI {data.index}</span>
      <Row gutter={[24, 24]} className='question-matching'>
        <Col span={24}>
          <div
            className='mb-3'
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
          <Row>
            <Col className='questions' span={12}>
              {data?.matching_answers?.questions &&
                data?.matching_answers?.questions.map((question) => (
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
                        strokeWidth={2}
                        headSize={4}
                        color='#2c4a9f'
                        showHead={showArrow}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <div className='mt-3 mb-2'>
            <strong>Trả lời</strong>
          </div>
          <div>
            {data?.matching_answers?.questions.map((question) => (
              <div className='d-flex align-items-center mb-2' key={question.id}>
                <div style={{ width: '15px' }} className='mr-2'>
                  {showIconResult(question.id)}
                </div>
                <div className='mr-2'>
                  <strong>{question.id}.</strong>
                </div>
                <div>
                  {data?.matching_answers?.answers.map((item) => (
                    <Button
                      type='primary'
                      ghost
                      className={
                        answers[question.id]?.find((x) => x == item.id)
                          ? 'btn-outline btn-answer active mr-2'
                          : 'btn-outline btn-answer mr-2'
                      }
                      key={item.id}
                    >
                      {item.id.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      {data.note_answer && (
        <Col className='mt-2'>
          <div>
            <strong>Giải thích đáp án</strong>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.note_answer }}></div>
        </Col>
      )}
    </div>
  );
};

export default Matching;
