import { Button, Col, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setTargetId, startDoingExam } from 'slices/doTest/doTest';

const Guide = () => {
  const dispatch = useDispatch();
  const param = useParams();
  useEffect(() => {
    if (param?.id) {
      dispatch(setTargetId(param.id));
    }
  }, []);
  return (
    <Row align='middle' gutter={[24, 24]} className='container guide'>
      <Col span={6} offset={10}>
        <h4>Hướng dẫn</h4>
      </Col>
      <Col span={12} offset={6}>
        <b>1. Thời gian làm bài</b>
        <p>- Không giới hạn thời gian làm bài</p>
      </Col>

      <Col span={12} offset={6}>
        <b>2. Nội quy</b>
        <p>- Không nhờ người khác thi hộ.</p>
        <p>- Không sao chép câu trả lời từ tài liệu trên internet.</p>
      </Col>

      <Col span={12} offset={6}>
        <b>3. Làm lại bài thi</b>
        <p>- Bài thi này có thể làm lại</p>
      </Col>
      <Col span={6} offset={10}>
        <Button type='primary' onClick={() => dispatch(startDoingExam())}>
          Bắt đầu làm bài
        </Button>
      </Col>
    </Row>
  );
};

export default Guide;
