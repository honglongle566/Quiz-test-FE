import { Col, Row } from 'antd';
import { useState } from 'react';

const FillingBlankSpace = ({ data }) => {
  const [answers, setAnswers] = useState({});
  const handleChangeAnswer = (e) => {
    setAnswers((pre) => {
      let newAnswer = { ...pre, [e.target.id]: e.target.value };
      return newAnswer;
    });
  };

  const changeContent = (answers) => {
    let newContent = data?.content;
    for (let item of data?.fill_blank_correct_answers) {
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

  return (
    <div className='fill-blank'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            className='mb-3s'
            dangerouslySetInnerHTML={{ __html: changeContent(answers) }}
          ></div>
          <div className='mt-3'>
            <div>
              <strong className=''>Trả lời</strong>
            </div>
            <div className='fill-blank__box'>
              {data?.fill_blank_correct_answers &&
                data?.fill_blank_correct_answers.map((item) => (
                  <div className='fill-blank__box__item' key={item.key}>
                    <div className='fill-blank__box_item__number'>
                      {item.key}
                    </div>
                    <div>
                      <input
                        type='text'
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
