import { Button, Col, Row } from 'antd';
import ReviewInfo from './ReviewInfo';
const LayoutReview = () => {
  return (
    <div className='layout-result'>
      <div className='layout-result__header'>
        <Row align='middle' gutter={[16, 16]}>
          <Col>
            <span className='logo logo__md'>Quiz Test</span>
          </Col>
          <Col>
            <div>
              <b>Ten</b>
            </div>
            <div>ten dot thi</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button>Thoát</Button>
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
