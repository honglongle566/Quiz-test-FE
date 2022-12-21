import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';

const MultipleChoice = ({ data, answers }) => {
  const showIconResult = (answer) => {
    if (data.correct_answer.includes(answer.id)) {
      if (answers.includes(answer.id)) {
        return <CheckCircleFilled className='text-green' />;
      }
      return <CheckCircleOutlined className='text-green' />;
    }

    if (answers.includes(answer.id)) {
      return <CloseCircleOutlined className='text-red' />;
    }
  };
  return (
    <div>
      <span className='question_order'>CÂU HỎI {data.index}</span>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div className='my-2'>
            <strong
              dangerouslySetInnerHTML={{
                __html: data.name,
              }}
            ></strong>
          </div>
          {data.answer.map((item) => (
            <div className='d-flex' key={item.id}>
              <div style={{ width: '15px' }} className='mr-2'>
                {showIconResult(item)}
              </div>
              <div className='mr-1'>
                <b>
                  {item.id}
                  {')'}
                </b>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.content,
                }}
              ></div>
            </div>
          ))}
        </Col>
        {data.note_answer && (
          <Col>
            <div>
              <strong>Giải thích đáp án</strong>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.note_answer }}></div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default MultipleChoice;
