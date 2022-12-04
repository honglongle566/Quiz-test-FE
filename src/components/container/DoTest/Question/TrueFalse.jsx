import { Col, Radio, Row, Space } from 'antd';
import { useState } from 'react';
import { sortAnswers } from '../../../../utils/question';

const TrueFalse = ({ data }) => {
  const [answer, setAnswer] = useState();
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            className='mb-3'
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <Radio.Group className='ml-2'>
            <Space direction='vertical'>
              {data.answers &&
                data.answers.sort(sortAnswers).map((answer) => (
                  <Radio value={answer.id} key={answer.id}>
                    <div style={{ display: 'flex' }}>
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
        </Col>
      </Row>
    </div>
  );
};

export default TrueFalse;
