import { Col, Row } from 'antd';

const QuestionInfo = () => {
  return (
    <div>
      <h3>Thông tin câu hỏi</h3>
      <Row>
        <Col span={8}>Kiểu câu hỏi: </Col>
        <Col span={16}>Đúng/Sai</Col>
      </Row>
      <Row>
        <Col span={8}>Điểm: </Col>
        <Col span={16}>1</Col>
      </Row>
      <Row>
        <Col span={8}>Ngày tạo: </Col>
        <Col span={16}>21/05/2022 14:34:05</Col>
      </Row>
      <Row>
        <Col span={8}>Thời gian làm bài: </Col>
        <Col span={16}>Không giới hạn</Col>
      </Row>
    </div>
  );
};

export default QuestionInfo;
