import { Col, Row } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListAnswer, doTestSelector } from 'slices/doTest/doTest';

const FillingBlankSpace = ({ data }) => {
  const [answers, setAnswers] = useState({});
  const dispatch = useDispatch();
  const { listAnswers } = useSelector(doTestSelector);
  const handleChangeAnswer = (e) => {
    let newAnswer = { ...answers, [e.target.id]: e.target.value };
    setAnswers(newAnswer);
    dispatch(
      updateListAnswer({
        index: data.index,
        answer: convertChooseAnswer(newAnswer),
      }),
    );
  };
  const convertChooseAnswer = (answer) => {
    let newAnswer = [];
    for (const [key, value] of Object.entries(answer)) {
      newAnswer.push({ key: key, content: value });
    }
    return newAnswer;
  };

  const changeContent = (answers) => {
    let newContent = data?.name;
    for (let item of data?.fill_blank_correct_answer) {
      if (answers[item.key] && answers[item.key] !== '') {
        newContent = newContent.replace(
          `[%${item.key}%]`,
          `<strong>${answers[item.key]}</strong>`,
        );
      } else {
        newContent = newContent.replace(
          `[%${item.key}%]`,
          `<strong>__${item.key}__</strong>`,
        );
      }
    }
    return newContent;
  };

  useEffect(() => {
    if (listAnswers[data.index]) {
      let newAnswer = {};
      for (let item of listAnswers[data.index]) {
        newAnswer = { ...newAnswer, [item.key]: [item.content] };
      }
      setAnswers(newAnswer);
    }
  }, []);

  return (
    <div className='fill-blank'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            dangerouslySetInnerHTML={{ __html: changeContent(answers) }}
          ></div>
          <div className='mt-3'>
            <div>
              <strong className=''>Trả lời</strong>
            </div>
            <div className='fill-blank__box'>
              {data?.fill_blank_correct_answer.map((item) => (
                <div className='fill-blank__box__item' key={item.key}>
                  <div className='fill-blank__box_item__number'>{item.key}</div>
                  <div>
                    <input
                      type='text'
                      value={answers[item.key] || ''}
                      className='fill-blank__box__item__input'
                      id={item.key}
                      onChange={handleChangeAnswer}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FillingBlankSpace;
