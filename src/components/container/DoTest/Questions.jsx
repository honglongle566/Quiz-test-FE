import { Col, Divider } from 'antd';

import FillingBlankSpace from './Question/FillingBlankSpace';
import Matching from './Question/Matching';
import MultipleChoice from './Question/MultipleChoice';
import TrueFalse from './Question/TrueFalse';

const Questions = (props) => {
  const { data } = props;
  const showArrayQuestion = (question) => {
    if (question.type === 1) return <MultipleChoice data={question} />;
    if (question.type === 2) return <TrueFalse data={question} />;
    if (question.type === 3) return <Matching data={question} />;
    if (question.type === 4) return <FillingBlankSpace data={question} />;
  };

  return (
    <>
      {data &&
        data.map((question, index) => (
          <Col span={24} key={question.id}>
            <div className='exam exam__border question-box'>
              <span>
                CÂU HỎI {index + 1}{' '}
                <small>
                  {question?.has_mul_correct_answers
                    ? '(Chọn nhiều đáp án)'
                    : '(Chỉ chọn một đáp án)'}
                </small>
              </span>
              <Divider className='ma-0 my-3' />
              {showArrayQuestion(question)}
            </div>
          </Col>
        ))}
    </>
  );
};

export default Questions;
