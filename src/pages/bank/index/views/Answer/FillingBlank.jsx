import React from "react";
import { Row, Col } from "antd";

const FillingBlank = (props) => {
  const { question } = props;
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: question?.content }}></div>
      <div>
        <b>Answer</b>
      </div>
      {question?.fill_blank_correct_answers.map((item) => (
        <Row>
          <Col span={5}>{item.key}</Col>
          <Col span={15}>{item.content[0]}</Col>
        </Row>
      ))}
    </div>
  );
};

export default FillingBlank;
