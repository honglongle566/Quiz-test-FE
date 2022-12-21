import { Button, Col, Row, Progress, Divider } from 'antd';
import { useState } from 'react';
import FillingBlankSpace from 'shares/result/question/FillingBlankSpace';
import Matching from 'shares/result/question/Matching';
import MultipleChoice from 'shares/result/question/MultipleChoice';
import TrueFalse from 'shares/result/question/TrueFalse';
import { useSelector } from 'react-redux';
import { resultCandiateSelector } from 'slices/result/resultCandiate';
import { subDateTime } from 'utils/utils';

const showQuestion = (question, answers) => {
  if (question.type === 1) {
    return <MultipleChoice data={question} answers={answers} />;
  }
  if (question.type === 2) {
    return <TrueFalse data={question} answers={answers} />;
  }
  if (question.type === 3)
    return <Matching data={question} answers={answers} />;
  if (question.type === 4) {
    return <FillingBlankSpace data={question} answers={answers} />;
  }
};

const ReviewInfo = () => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const { resultData } = useSelector(resultCandiateSelector);
  return (
    <Row className='result-view container mt-8'>
      <Col span={24} className='text-center'>
        <img src={require('assets/img/successful.png')} alt='' />
        <h1 className='text-green mt-3'>HOÀN THÀNH BÀI KIỂM TRA</h1>
        <p className='my-1'>
          Cảm ơn <b>{resultData.name}</b> đã tham gia bài kiểm tra.
        </p>
        <div className='my-3'></div>
      </Col>
      <Col span={24}>
        <Row className='d-flex justify-content-center'>
          <Col span={9}>
            <div className='box-border bg-white py-4 px-3'>
              <h3 className='text-center'>KẾT QUẢ BÀI KIỂM TRA</h3>
              <div>
                <p className='text-green text-center my-3'>
                  <span className='font-weight-light font-size-large'>
                    {resultData.score || 0}
                  </span>
                  <span className='font-weight-normal'>
                    /{resultData.max_score || 0} ĐIỂM
                  </span>
                </p>
              </div>
              <div>
                <Row>
                  <Col span={12}>Phần trăm hoàn thành đúng</Col>
                  <Col span={12}>
                    <Progress
                      percent={Math.floor(
                        (resultData.score / resultData.max_score) * 100 || 0,
                      )}
                      size='small'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>Số câu đúng</Col>
                  <Col span={12} className='text-right'>
                    <b>
                      {resultData.total_right}/{resultData.total_question}
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>Thời gian làm bài</Col>
                  <Col span={12} className='text-right'>
                    <b>
                      {subDateTime(resultData.time_start, resultData.time_end)}
                    </b>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <div className='d-flex justify-content-center my-3'>
          <Button
            type='primary'
            onClick={() => setIsShowAnswer(!isShowAnswer)}
            id='test1'
            name='test1'
          >
            {isShowAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
          </Button>
        </div>
      </Col>

      {isShowAnswer && (
        <Col span={24} className='box-border pa-4'>
          <h2 className='text-center font-weight-normal'>
            Kết quả bài kiểm tra
          </h2>
          <Divider className='my-3' />
          <div>
            {resultData?.details &&
              resultData.details.map((question) => (
                <div key={question.id}>
                  {showQuestion(question, question.examinee_answers)}
                  <Divider className='my-3' />
                </div>
              ))}
          </div>
        </Col>
      )}
    </Row>
  );
};

export default ReviewInfo;
