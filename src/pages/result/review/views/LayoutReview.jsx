import { Button, Col, Row } from 'antd';
import ReviewInfo from './ReviewInfo';
import { useSelector, useDispatch } from 'react-redux';
import { resultCandiateSelector } from 'slices/result/resultCandiate';
import { onchangeRouterLink } from 'slices/core/appState';
const LayoutReview = () => {
  const { resultData } = useSelector(resultCandiateSelector);
  const dispatch = useDispatch();
  return (
    <div className='layout-result'>
      <div className='layout-result__header'>
        <Row align='middle' gutter={[16, 16]}>
          <Col>
            <span className='logo logo__md'>Quiz Test</span>
          </Col>
          <Col>
            <div>
              <b>{resultData.name}</b>
            </div>
            <div>{resultData.exam_room_name}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => dispatch(onchangeRouterLink('/'))}>
              Thoát
            </Button>
          </Col>
        </Row>
      </div>
      <Row justify='center' className='layout-result__content'>
        <Col>
          <ReviewInfo />
        </Col>
      </Row>
    </div>
  );
};

export default LayoutReview;
