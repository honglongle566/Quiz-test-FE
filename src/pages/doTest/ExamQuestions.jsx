import {
  BackwardOutlined,
  CheckCircleOutlined,
  ForwardOutlined,
} from '@ant-design/icons';
import { Button, Col, Divider, Row, Statistic } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  doTestSelector,
  getExamQuestion,
  setTargetId,
} from 'slices/doTest/doTest';
import Questions from './Questions';

const ExamQuestions = (props) => {
  const dispatch = useDispatch();
  const { listQuestion } = useSelector(doTestSelector);

  const param = useParams();
  useEffect(() => {
    if (param?.id) {
      dispatch(setTargetId(param.id));
      dispatch(getExamQuestion());
    }
  }, []);
  const onFinish = () => {
    console.log('finished!');
  };

  return (
    <div className='exam_question container'>
      <Row gutter={[36, 0]}>
        <Col span={16} className='mb-5'>
          <Row gutter={[16, 16]} justify='center'>
            <Questions />
            <Col span={24} className='mt-2'>
              <Row>
                <Col flex={1}>
                  <Button>
                    <BackwardOutlined /> Câu hỏi trước
                  </Button>
                </Col>
                <Col>
                  <Button>
                    Câu hỏi tiếp theo <ForwardOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button type='primary'>Nộp bài thi</Button>
            </Col>
          </Row>
        </Col>
        <Col
          span={8}
          className='exam exam__border exam_question__category exam_question__category--role'
        >
          <Row justify='center' gutter={[16, 16]}>
            <Col>
              <Row justify='center' gutter={[24, 24]}>
                <h3>Thời gian làm bài kiểm tra còn lại</h3>

                <Statistic.Countdown
                  value={Date.now() + 60 * 1000}
                  onFinish={onFinish}
                />

                <small>
                  Khi hết thời gian làm bài, kết quả sẽ chỉ được tính ở các câu
                  bạn đã chọn đáp án.
                </small>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }} />
                <Col>
                  <h3>Danh sách câu hỏi</h3>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                {listQuestion.map((question, index) => (
                  <Col span={24} key={question.id}>
                    <Row>
                      <Col span={22}>
                        <a
                          href={`#${question.index}`}
                          className='text-bold text_mute'
                        >
                          Cau {index + 1}: {question.name}
                        </a>
                      </Col>
                      <Col span={2}>
                        <CheckCircleOutlined />
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ExamQuestions;
