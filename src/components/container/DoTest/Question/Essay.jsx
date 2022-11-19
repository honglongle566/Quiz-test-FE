import { Col, Divider, Input, Row, Button } from "antd";
import { useState } from "react";

function Essay({ data }) {
  const [answer, setAnswer] = useState();
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            style={{ marginBottom: "10px" }}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
          <Input.TextArea placeholder="Nhập câu trả lời của bạn..." rows={4} />
        </Col>
      </Row>
    </div>
  );
}

function HideEssay() {
  return (
    <div className="preview-question">
      <Row gutter={[24, 24]} className="preview-question__hide">
        <Col span={24}>
          <div style={{ marginBottom: "10px" }}>
            Labore, laboriosam. Harum voluptatem provident, atque, nam inventore
            quam, libero dolor dolorum repellat sed ducimus dolores!
          </div>
          <Input.TextArea placeholder="Nhập câu trả lời của bạn..." rows={4} />
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

export default Essay;
