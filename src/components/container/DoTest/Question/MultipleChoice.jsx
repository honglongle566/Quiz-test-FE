import { Checkbox, Col, Divider, Radio, Row, Space, Button } from "antd";
import { useState } from "react";
import { sortAnswers } from "../../../../utils/question";
import CountDown from "../CountDown";
function MultipleChoice({ data }) {
  const [answer, setAnswer] = useState();
  const [isCountDown, setCountDown] = useState(0);
  const handleChangeAnswer = (value) => {
    setAnswer(value);
  };
  const time = 20;
  const [renderTime, setRenderTime] = useState(true);
  const onFinish = () => {
    setRenderTime(false);
  };
  const handleStartAnswer = () => {
    setCountDown(true);
  };

  return (
    <div>
      {data.time_limit && data.time_limit > 0 && !isCountDown ? (
        <HideMultipleChoice data={data} handleStartAnswer={handleStartAnswer} />
      ) : (
        <Row gutter={[24, 24]}>
          <Col span={24}>
            {isCountDown && (
              <CountDown
                timeDate={Date.now() + 20 * 1000}
                renderTime={renderTime}
                onFinish={onFinish}
                time={time}
              />
            )}
            <div
              style={{ marginBottom: "10px" }}
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
            {data?.has_mul_correct_answers ? (
              <Checkbox.Group onChange={(value) => handleChangeAnswer(value)}>
                <Space direction="vertical">
                  {data.answers &&
                    data.answers.sort(sortAnswers).map((answer) => (
                      <Col key={answer.id}>
                        <Checkbox value={answer.id}>
                          <div style={{ display: "flex" }}>
                            <div style={{ marginRight: "4px" }}>
                              <b>{answer.id.toUpperCase()}</b>
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: answer.content,
                              }}
                            ></div>
                          </div>
                        </Checkbox>
                      </Col>
                    ))}
                </Space>
              </Checkbox.Group>
            ) : (
              <Radio.Group
                style={{ marginLeft: "17px" }}
                onChange={(e) => handleChangeAnswer(e.target.value)}
              >
                <Space direction="vertical">
                  {data.answers &&
                    data.answers.sort(sortAnswers).map((answer) => (
                      <Radio value={answer.id} key={answer.id}>
                        <div style={{ display: "flex" }}>
                          <div style={{ marginRight: "4px" }}>
                            <b>
                              {answer.id.toUpperCase()}
                              {")"}
                            </b>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{ __html: answer.content }}
                          ></div>
                        </div>
                      </Radio>
                    ))}
                </Space>
              </Radio.Group>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
}

function HideMultipleChoice({ data, handleStartAnswer }) {
  return (
    <div className="preview-question">
      <Row gutter={[24, 24]} className="preview-question__hide">
        <Col span={24}>
          <div style={{ marginBottom: "10px" }}>
            Labore, laboriosam. Harum voluptatem provident, atque, nam inventore
            quam, libero dolor dolorum repellat sed ducimus dolores!
          </div>
          <Checkbox.Group>
            <Space direction="vertical">
              {data.answers &&
                data.answers.sort(sortAnswers).map((answer) => (
                  <Col key={answer.id}>
                    <Checkbox value={answer.id}>
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "4px" }}>
                          <b>{answer.id.toUpperCase()}</b>
                        </div>
                        <div>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Libero facilis nemo quasi reprehenderit
                          voluptates.
                        </div>
                      </div>
                    </Checkbox>
                  </Col>
                ))}
            </Space>
          </Checkbox.Group>
        </Col>
      </Row>
      <div className="preview-question__box">
        <div className="preview-question__box__title">
          This question has a time limit to answer is 01, click start to view
          and answer the question
        </div>
        <div className="preview-question__box__btn">
          <Button
            type="primary"
            ghost
            className="btn-outline"
            onClick={handleStartAnswer}
          >
            Bắt đầu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MultipleChoice;
