import React from "react";
import { Button, Col, Form, Input, Popover, Radio, Row, Tag } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ListIndex from "./ListIndex";
const LayoutIndex = () => {
  const { t } = useTranslation("statistic");
  return (
    <div className="d-flex justify-content-center flex-column">
      <Row gutter={[16, 16]} justify="center" className="container pa-3">
        <div className="white-bg">
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Popover placement="bottomLeft" trigger="click">
                <Button type="primary">
                  {t("add_filter_options", { ns: "statistic" })}
                </Button>
              </Popover>
            </Col>
            <Col span={24}>
              <Radio.Group>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Radio value={1}>
                      {t("include_all_options_filter", { ns: "statistic" })}
                    </Radio>
                  </Col>
                  <Col span={24}>
                    <Radio value={2}>
                      {t("include_one_of_all_options_filter", {
                        ns: "statistic",
                      })}
                    </Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Col>
            <Col span={24}>
              <Tag closable>{t("email", { ns: "statistic" })}</Tag>
              <Tag closable>{t("identify_code", { ns: "statistic" })}</Tag>
              <Tag closable>{t("fullname", { ns: "statistic" })}</Tag>
              <Tag closable>{t("phone", { ns: "statistic" })}</Tag>
              <Tag closable>{t("position", { ns: "statistic" })}</Tag>
              <Tag closable>{t("group", { ns: "statistic" })}</Tag>
            </Col>
          </Row>
        </div>
      </Row>
      <Row className="container">
        <ListIndex />
      </Row>
    </div>
  );
};

export default LayoutIndex;
