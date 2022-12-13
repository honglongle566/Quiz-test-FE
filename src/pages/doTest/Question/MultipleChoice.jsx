import { Checkbox, Col, Radio, Row, Space } from 'antd';
import { useState } from 'react';
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
          dangerouslySetInnerHTML={{ __html: data.name }}
        ></div>
        {data?.has_mul_correct_answers ? (
          <Checkbox.Group onChange={(value) => handleChangeAnswer(value)}>
            <Space direction='vertical'>
              {data.answer.map((item) => (
                <Col key={item.id}>
                  <Checkbox value={item.id}>
                    <div className='d-flex'>
                      <div className='mr-1'>
                        <b>{item.id.toUpperCase()}</b>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.content,
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
              {data.answer.map((item) => (
                <Radio value={item.id} key={item.id}>
                  <div className='d-flex'>
                    <div className='mr-1'>
                      <b>
                        {item.id.toUpperCase()}
                        {')'}
                      </b>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.content }}
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
