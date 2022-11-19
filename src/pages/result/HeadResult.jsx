import { Button, Col, Row } from "antd";
import ResultView from "../../components/container/Result/ResultView";

function HeaderResult(props) {
  return (
    <div className="header-do-test">
      <div className="header-do-test__wrapper">
        <Row align="middle" gutter={[16, 16]}>
          <Col>
            <span className="logo logo__md">Quiz Test</span>
          </Col>
          <Col>
            <b>ten dot thi</b>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button>Thoát</Button>
          </Col>
        </Row>
      </div>
      <Row justify="center">
        <Col>
          <ResultView />
        </Col>
      </Row>
    </div>
  );
}

export default HeaderResult;
