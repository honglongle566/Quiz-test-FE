import {
  CheckCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
  Collapse,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

function DragItem({ key, ...props }) {
  const { t } = useTranslation("test", "common");
  const [showPannel, setShowPannel] = useState(false);
  const [checked, setChecked] = useState(false);
  const onEdit = (e) => {
    e.stopPropagation();
  };
  const onCopy = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: `${t("do_you_want_to_duplicate_this_question", { ns: "test" })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t("button.yes", { ns: "common" })}`,
      cancelText: `${t("button.cancel", { ns: "common" })}`,
      onOk: onOkCopy,
    });
  };
  const onDelete = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: `${t("do_you_want_to_remove_question_from_test", { ns: "test" })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t("button.yes", { ns: "common" })}`,
      cancelText: `${t("button.cancel", { ns: "common" })}`,
      onOk: onOkDelete,
    });
  };
  const onCheck = (e) => {
    e.stopPropagation();
    setChecked(!checked);
  };
  const onOkCopy = () => {};
  const onOkDelete = () => {};
  return (
    <Panel
      key={key}
      {...props}
      extra={[
        <Tooltip key={1} title={t("button.update", { ns: "common" })}>
          <EditOutlined onClick={onEdit} />
        </Tooltip>,
        <Tooltip key={2} title={t("button.duplicate", { ns: "common" })}>
          <CopyOutlined onClick={onCopy} />
        </Tooltip>,
        <Tooltip key={3} title={t("button.delete", { ns: "common" })}>
          <DeleteOutlined onClick={onDelete} />
        </Tooltip>,
      ]}
      header={
        <div>
          <Checkbox
            checked={checked}
            onClick={(e) => e.stopPropagation()}
            onChange={onCheck}
          >
            <Typography.Title level={5}>
              {t("Question", { ns: "test" })} {1 + 1}
            </Typography.Title>
          </Checkbox>
          <Divider type="vertical" style={{ height: 40 }} />
          <Typography.Text>question.name</Typography.Text>
        </div>
      }
    >
      <Divider />
      <Row
        gutter={[24, 24]}
        align="top"
        justify="space-around"
        style={{ marginBottom: 22 }}
      >
        <Col md={12} xs={24}>
          <Typography.Title level={5}>
            {t("answers", { ns: "test" })}
          </Typography.Title>
          <Row>
            <Col span={24} key={1}>
              <Typography.Text>
                {t("answers", { ns: "test" })} {1}: answer.content
                <CheckCircleOutlined style={{ color: "green" }} />
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col md={12} xs={24}>
          <Typography.Title level={5}>
            {t("question_information", { ns: "test" })}
          </Typography.Title>
          <table>
            <tbody>
              <tr>
                <td>{t("question_type", { ns: "test" })}</td>
                <td>question.questionTypeId</td>
              </tr>
              <tr>
                <td>{t("point", { ns: "test" })}</td>
                <td>question.score</td>
              </tr>
              <tr>
                <td>{t("created_at", { ns: "test" })}</td>
                <td>
                  question.createdAt
                  {/* {new Date(question.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })} */}
                </td>
              </tr>
              <tr>
                <td>{t("time_limit", { ns: "test" })}</td>
                <td>question.duration</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </Panel>
  );
}

export default DragItem;
