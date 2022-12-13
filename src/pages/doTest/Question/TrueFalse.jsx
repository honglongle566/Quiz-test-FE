import { Col, Radio, Row, Space } from 'antd';
import { useState } from 'react';

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
            dangerouslySetInnerHTML={{ __html: data.name }}
          ></div>
          <Radio.Group className='ml-2'>
            <Space direction='vertical'>
              {data.answer.map((item) => (
                <Radio value={item.id} key={item.id}>
                  <div style={{ display: 'flex' }}>
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
        </Col>
      </Row>
    </div>
  );
};

export default TrueFalse;
