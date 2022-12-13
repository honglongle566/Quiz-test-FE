import { Col, Divider, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { doTestSelector, infoCollect } from 'slices/doTest/doTest';

const DoTest = () => {
  const { examRoom } = useSelector(doTestSelector);
  const dispatch = useDispatch();
  const param = useParams();
  useEffect(() => {
    if (param?.id) {
      dispatch(infoCollect(param.id));
    }
  }, []);
  return (
    <div className='do-test__wrapper'>
      <Row justify='center' align='middle'>
        <Col span={24} className='text-center'>
          <span className='logo logo__lg'>Quiz Test</span>
        </Col>
        <Col span={24} className='text-center'>
          <h4 className='do-test__name'>{examRoom.name}</h4>
        </Col>
        <Col span={24} className='text-center'>
          <p>{examRoom.description}</p>
        </Col>
        <Divider />
        <Col span={24}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default DoTest;
