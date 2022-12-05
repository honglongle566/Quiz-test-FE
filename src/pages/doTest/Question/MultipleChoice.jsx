import { Checkbox, Col, Radio, Row, Space } from 'antd';
import { useState } from 'react';
import { sortAnswers } from '../../../utils/question';
const MultipleChoice = ({ data }) => {
  const [answer, setAnswer] = useState();
  const handleChangeAnswer = (value) => {
    setAnswer(value);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <div
          className='mb-3'
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
        {data?.has_mul_correct_answers ? (
          <Checkbox.Group onChange={(value) => handleChangeAnswer(value)}>
            <Space direction='vertical'>
              {data.answers &&
                data.answers.sort(sortAnswers).map((answer) => (
                  <Col key={answer.id}>
                    <Checkbox value={answer.id}>
                      <div className='d-flex'>
                        <div className='mr-1'>
                          <b>{answer.id.toUpperCase()}</b>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: answer.content,
                          }}
                        ></div>
                      </div>
                    </Checkbox>
                  </Col>
                ))}
            </Space>
          </Checkbox.Group>
        ) : (
          <Radio.Group
            className='ml-2'
            onChange={(e) => handleChangeAnswer(e.target.value)}
          >
            <Space direction='vertical'>
              {data.answers &&
                data.answers.sort(sortAnswers).map((answer) => (
                  <Radio value={answer.id} key={answer.id}>
                    <div className='d-flex'>
                      <div className='mr-1'>
                        <b>
                          {answer.id.toUpperCase()}
                          {')'}
                        </b>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{ __html: answer.content }}
                      ></div>
                    </div>
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        )}
      </Col>
    </Row>
  );
};

export default MultipleChoice;
