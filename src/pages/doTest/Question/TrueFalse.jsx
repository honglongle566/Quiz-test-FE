import { Col, Radio, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListAnswer, doTestSelector } from 'slices/doTest/doTest';

const TrueFalse = ({ data }) => {
  const [answer, setAnswer] = useState();
  const dispatch = useDispatch();
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
    dispatch(updateListAnswer({ index: data.index, answer: [e.target.value] }));
  };
  const { listAnswers } = useSelector(doTestSelector);
  useEffect(() => {
    if (listAnswers[data.index]) {
      setAnswer(listAnswers[data.index][0]);
    }
  }, []);
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            className='mb-3'
            dangerouslySetInnerHTML={{ __html: data.name }}
          ></div>
          <Radio.Group
            className='ml-2'
            onChange={handleChangeAnswer}
            value={answer}
          >
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
