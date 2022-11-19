import { Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CardTest() {
  const { t } = useTranslation("dashboard");
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col lg={6} md={12} xs={24}>
          <div className="white-bg">
            <Link to="/test-campaigns" className="p-4">
              <div>
                <p className="font_weight_bold">6</p>
                <p>{t("test_campaigns", { ns: "dashboard" })}</p>
              </div>
              <img
                src={require("../../../assets/img/test-campaigns.png")}
                alt=""
              />
            </Link>
          </div>
        </Col>
        <Col lg={6} md={12} xs={24}>
          <div className="white-bg">
            <Link to="/tests" className="p-4">
              <div>
                <p className="font_weight_bold">7</p>
                <p>{t("tests", { ns: "dashboard" })}</p>
              </div>
              <img src={require("../../../assets/img/test.png")} alt="" />
            </Link>
          </div>
        </Col>
        <Col lg={6} md={12} xs={24}>
          <div className="white-bg">
            <Link to="/bank" className="p-4">
              <div>
                <p className="font_weight_bold">50</p>
                <p>{t("questions", { ns: "dashboard" })}</p>
              </div>
              <img src={require("../../../assets/img/question.png")} alt="" />
            </Link>
          </div>
        </Col>
        <Col lg={6} md={12} xs={24}>
          <div className="white-bg">
            <Link to="/test-categories" className="p-4">
              <div>
                <p className="font_weight_bold">9</p>
                <p>{t("test_categories", { ns: "dashboard" })}</p>
              </div>
              <img
                src={require("../../../assets/img/group-question.png")}
                alt=""
              />
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default CardTest;
