import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import HeaderAuth from "../../components/commons/HeaderAuth";

function Auth(props) {
  return (
    <div className="auth">
      <HeaderAuth />
      <Row justify="center">
        <Col>
          <div className="auth__wrapper">
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Auth;
