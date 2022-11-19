import { Button, Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import Xarrow from "react-xarrows";
import { sortAnswers } from "../../../../utils/question";

function Matching({ data }) {
  const [chooseAnswer, setChooseAnswer] = useState({});
  const handleChooseAnswer = (questionID, answerID) => {
    setChooseAnswer((pre) => {
      return {
        ...pre,
        [`${questionID}+${answerID}`]:
          !chooseAnswer[`${questionID}+${answerID}`],
      };
    });
  };

  useEffect(() => {
    const questions = [...data?.matching_answers?.questions];
    const answers = [...data?.matching_answers?.answers];
    for (let question of questions) {
      for (let answer of answers) {
        setChooseAnswer((pre) => {
          return { ...pre, [`${question.id}+${answer.id}`]: false };
        });
      }
    }
  }, []);

  return (
    <div>
      <Row gutter={[24, 24]} className="question-matching">
        <Col span={24}>
          <div
            style={{ marginBottom: "10px" }}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
          <Row>
            <Col className="questions" span={12}>
              {data?.matching_answers?.questions &&
                data?.matching_answers?.questions.map((question) => (
                  <div className="questions__box" key={question.id}>
                    <div className="questions__box__item">
                      <div className="questions__box__item__content">
                        <span>
                          <strong>{question.id}.</strong>
                        </span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: question.content,
                          }}
                        ></span>
                      </div>
                      <div className="questions__box__item__circle">
                        <div
                          id={`${data.index}-${question.id}`}
                          className="questions__box__item__circle__icon"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </Col>
            <Col className="answers" span={12}>
              {data?.matching_answers?.answers &&
                data?.matching_answers?.answers
                  .sort(sortAnswers)
                  .map((answer) => (
                    <div className="answers__box" key={answer.id}>
                      <div className="answers__box__item">
                        <div className="answers__box__item__circle">
                          <div
                            id={`${data.index}-${answer.id}`}
                            className="answers__box__item__circle__icon"
                          ></div>
                        </div>
                        <div className="answers__box__item__content">
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
                            path="straight"
                            strokeWidth={
                              chooseAnswer[`${question.id}+${answer.id}`]
                                ? 2
                                : 0
                            }
                            headSize={4}
                            color="#2c4a9f"
                            showHead={
                              chooseAnswer[`${question.id}+${answer.id}`]
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
            </Col>
          </Row>
          <div className="mb-1">
            <strong>Trả lời</strong>
          </div>
          <div className="list-answer">
            {data?.matching_answers?.questions &&
              data?.matching_answers?.questions.map((question) => (
                <div className="list-answer__box" key={question.id}>
                  <div className="mr-2">
                    <strong>{question.id}.</strong>
                  </div>
                  <div>
                    {data?.matching_answers?.answers &&
                      data?.matching_answers?.answers
                        .sort(sortAnswers)
                        .map((answer) => (
                          <Button
                            type="primary"
                            ghost
                            className={
                              chooseAnswer[`${question.id}+${answer.id}`]
                                ? "btn-outline btn-answer active"
                                : "btn-outline btn-answer"
                            }
                            key={answer.id}
                            onClick={() =>
                              handleChooseAnswer(question.id, answer.id)
                            }
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
}

function HideMatching({ data }) {
  return (
    <div className="preview-question">
      <Row
        gutter={[24, 24]}
        className="question-matching preview-question__hide"
      >
        <Col span={24}>
          <div style={{ marginBottom: "10px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
            facilis nemo quasi reprehenderit voluptates.
          </div>
          <Row>
            <Col className="questions" span={12}>
              {data?.matching_answers?.questions &&
                data?.matching_answers?.questions.map((question) => (
                  <div className="questions__box" key={question.id}>
                    <div className="questions__item">
                      <div className="questions__item__content">
                        <span>
                          <strong>{question.id}.</strong>
                        </span>
                        <span> Lorem ipsum, dolor sit amet</span>
                      </div>
                      <div className="questions__item__circle">
                        <div
                          id={question.id}
                          className="questions__item__circle__icon"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </Col>
            <Col className="answers" span={12}>
              {data?.matching_answers?.answers &&
                data?.matching_answers?.answers
                  .sort(sortAnswers)
                  .map((answer) => (
                    <div className="answers__box" key={answer.id}>
                      <div className="answers__box__item">
                        <div className="answers__box__item__circle">
                          <div
                            id={answer.id}
                            className="answers__box__item__circle__icon"
                          ></div>
                        </div>
                        <div className="answers__box__item__content">
                          <span>
                            <strong>{answer.id.toUpperCase()}.</strong>
                          </span>
                          <span>Lorem ipsum, dolor sit amet consectetur</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Col>
          </Row>
          <div className="mb-1">
            <strong>Trả lời</strong>
          </div>
          <div className="list-answer">
            {data?.matching_answers?.questions &&
              data?.matching_answers?.questions.map((question) => (
                <div className="list-answer__box" key={question.id}>
                  <div className="mr-2">
                    <strong>{question.id}.</strong>
                  </div>
                  <div>
                    {data?.matching_answers?.answers &&
                      data?.matching_answers?.answers.map((answer) => (
                        <button className="btn-answer" key={answer.id}>
                          {answer.id.toUpperCase()}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </Col>
      </Row>
      <div className="preview-question__box">
        <div className="preview-question__box__title">
          This question has a time limit to answer is 01:00:00, click start to
          view and answer the question
        </div>
        <div className="preview-question__box__btn">
          <Button type="primary" ghost className="btn-outline">
            Bắt đầu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Matching;
