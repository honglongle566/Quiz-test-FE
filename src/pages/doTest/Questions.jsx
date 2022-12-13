import { Col, Divider } from 'antd';

import FillingBlankSpace from './Question/FillingBlankSpace';
import Matching from './Question/Matching';
import MultipleChoice from './Question/MultipleChoice';
import TrueFalse from './Question/TrueFalse';
import { useSelector } from 'react-redux';
import { doTestSelector } from 'slices/doTest/doTest';

const Questions = () => {
  const { questions } = useSelector(doTestSelector);
  const showArrayQuestion = (question) => {
    if (question.type === 1) return <MultipleChoice data={question} />;
    if (question.type === 2) return <TrueFalse data={question} />;
    if (question.type === 3) return <Matching data={question} />;
    if (question.type === 4) return <FillingBlankSpace data={question} />;
  };

  const showMessageQuestion = (question) => {
    if (question.type === 4) return;
    if (question.type === 3 || question?.has_mul_correct_answers)
      return '(Chọn nhiều đáp án)';
    return '(Chỉ chọn một đáp án)';
  };

  return (
    <>
      {questions.map((question, index) => (
        <Col id={question.index} span={24} key={question.id}>
          <div className='exam exam__border question-box'>
            <span>
              CÂU HỎI {index + 1} <small>{showMessageQuestion(question)}</small>
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
