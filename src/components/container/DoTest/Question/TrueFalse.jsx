import { Col, Divider, Radio, Row, Space, Button, CountDown } from "antd";
import { useState } from "react";
import { sortAnswers } from "../../../../utils/question";

function TrueFalse({ data }) {
  const [answer, setAnswer] = useState();
  const [isCountDown, setCountDown] = useState(false);
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            style={{ marginBottom: "10px" }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <Radio.Group style={{ marginLeft: "17px" }}>
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
        </Col>
      </Row>
    </div>
  );
}

function HideTrueFalse({ data, setCountDown }) {
  return (
    <div className="preview-question">
      <Row gutter={[24, 24]} className="preview-question__hide">
        <Col span={24}>
          <div style={{ marginBottom: "10px" }}>
            Labore, laboriosam. Harum voluptatem provident, atque, nam inventore
            quam, libero dolor dolorum repellat sed ducimus dolores!
          </div>
          <Radio.Group style={{ marginLeft: "17px" }}>
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
                      <div>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Libero facilis nemo quasi reprehenderit
                        voluptates.
                      </div>
                    </div>
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        </Col>
      </Row>
      <div className="preview-question__box">
        <div className="preview-question__box__title">
          This question has a time limit to answer is 01:00:00, click start to
          view and answer the question
        </div>
        <div className="preview-question__box__btn">
          <Button
            type="primary"
            ghost
            className="btn-outline"
            onClick={setCountDown}
          >
            Bắt đầu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TrueFalse;
