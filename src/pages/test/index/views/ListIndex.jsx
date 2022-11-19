import {
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  FolderOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  ScheduleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const { Panel } = Collapse;

const ListIndex = () => {
  const { t } = useTranslation("test", "common");

  const onEditExam = (e) => {
    e.stopPropagation();
  };
  const onCreateExam = (e) => {
    e.stopPropagation();
  };
  const onDeleteExam = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="mt-3">
      <Collapse
        expandIconPosition="end"
        expandIcon={() => <CaretRightOutlined rotate={90} />}
        ghost
        className="mb-3 card-medium"
      >
        <Panel
          key={1}
          extra={[
            <Tooltip
              key={"edit"}
              title={t("update_test_infomation", { ns: "test" })}
            >
              <Button type="text">
                <EditOutlined onClick={onEditExam} />
              </Button>
            </Tooltip>,
            <Tooltip
              key={"export"}
              title={t("create_new_test_campaign", { ns: "test" })}
            >
              <Button type="text">
                <ExportOutlined onClick={onCreateExam} />
              </Button>
            </Tooltip>,
            <Tooltip
              key={"delete"}
              title={t("button.delete", { ns: "common" })}
            >
              <Button type="text">
                <DeleteOutlined onClick={onDeleteExam} />
              </Button>
            </Tooltip>,
          ]}
          header={
            <div>
              <Typography.Title
                level={4}
                className="font-weight-light font-size-medium"
              >
                test.name
              </Typography.Title>
              <div className="d-flex">
                <div className="text-info-small">
                  <ScheduleOutlined />
                  <p>
                    thời gian
                    {/* {new Date(test.createdAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })} */}
                  </p>
                </div>
                <div className="text-info-small">
                  <LinkOutlined />
                  <p>1 đợt thi</p>
                </div>
                <div className="text-info-small">
                  <QuestionCircleOutlined />
                  <p>1 {t("questions", { ns: "test" })}</p>
                </div>
                <div className="text-info-small">
                  <TrophyOutlined />
                  <p>2{t("score", { ns: "test" })}</p>
                </div>
                <div className="text-info-small">
                  <FolderOutlined />
                  <p>name</p>
                </div>
              </div>
            </div>
          }
        >
          <Divider className="ma-0" />
          <div className="py-3">
            <p>{t("this_test_currently_has_no_campaigns", { ns: "test" })}</p>
            <Link to="/test-campaigns">
              {t("create_test_campaign", { ns: "test" })}
            </Link>
          </div>
          <Divider className="ma-0" />

          <div className="d-flex justify-content-between align-items-center pt-3 pb-2">
            <div>
              <h3>exam.name</h3>
              <p>exam.link</p>
            </div>

            <div className="test-detail-option">
              <Button type="link" className="link">
                {t("button.copy_link", { ns: "common" })}
              </Button>
              <Link to={"/test-campaigns"} className="link">
                <Button type="link" className="link">
                  {t("button.setting", { ns: "common" })}
                </Button>
              </Link>
              <Link to={"/tests/items.id/result"} className="btn-link">
                <Button type="link" className="link">
                  {t("button.result", { ns: "common" })}
                </Button>
              </Link>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ListIndex;
