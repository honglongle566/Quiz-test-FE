import { Col, Divider, Row } from 'antd';
import JoinTest from 'pages/doTestCollect/JoinTest';
import InfoCollect from 'pages/doTestCollect/InfoCollect';
import { useState } from 'react';

const DoTest = () => {
  const [isAccessCode, setIsAccessCode] = useState(true);
  return (
    <div className='do-test__wrapper'>
      <Row justify='center' align='middle'>
        <Col span={24} className='text-center'>
          <span className='logo logo__lg'>Quiz Test</span>
        </Col>
        <Col span={24} className='text-center'>
          <h4 className='do-test__name'>Ten dot thi</h4>
        </Col>
        <Col span={24} className='text-center'>
          <p>gioi thieu</p>
        </Col>
        <Divider />
        <Col span={24}>
          {isAccessCode ? (
            <JoinTest setIsAccessCode={setIsAccessCode} />
          ) : (
            <InfoCollect />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DoTest;
