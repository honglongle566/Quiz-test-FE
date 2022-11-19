import { Col, Divider, Row } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAuth from "../../components/commons/HeaderAuth";

function DoTest() {
  return (
    <div className="do-test">
      <HeaderAuth />
      <div className="do-test__wrapper">
        <Row justify="center" align="middle">
          <Col span={24} className="text-center">
            <span className="logo logo__lg">Quiz Test</span>
          </Col>
          <Col span={24} className="text-center">
            <h4 className="do-test__name">Ten dot thi</h4>
          </Col>
          <Col span={24} className="text-center">
            <p>gioi thieu</p>
          </Col>
          <Divider />
          <Col span={24}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DoTest;
