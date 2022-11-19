import {
  CaretRightOutlined,
  CheckCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Collapse,
  Divider,
  Row,
  Select,
  Tooltip,
  Typography,
  Button,
} from "antd";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

const FormInfo = () => {
  const { t } = useTranslation("test", "common");
  return (
    <Row span={24}>
      <Row align="middle" justify="start" gutter={24} className="mt-3">
        <Col style={{ marginLeft: 18 }}>
          <Checkbox>
            <Typography.Title level={5}>
              {t("check_all", { ns: "test" })}
            </Typography.Title>
          </Checkbox>
        </Col>
        <Col>
          <Select style={{ width: 120 }}>
            <Select.Option value="none">
              {t("select", { ns: "test" })}
            </Select.Option>
            <Select.Option value="remove">
              {t("remove", { ns: "test" })}
            </Select.Option>
          </Select>
        </Col>
      </Row>

      <Col span={24} className="mt-3">
        <Collapse
          expandIconPosition="end"
          expandIcon={() => <CaretRightOutlined rotate={90} />}
          ghost
          className="card-medium"
        >
          <Panel
            key={1}
            extra={[
              <Tooltip key={1} title={t("button.update", { ns: "common" })}>
                <Button type="text">
                  <EditOutlined />
                </Button>
              </Tooltip>,
              <Tooltip key={2} title={t("button.duplicate", { ns: "common" })}>
                <Button type="text">
                  <CopyOutlined />
                </Button>
              </Tooltip>,
              <Tooltip key={3} title={t("button.delete", { ns: "common" })}>
                <Button type="text">
                  <DeleteOutlined />
                </Button>
              </Tooltip>,
            ]}
            header={
              <div>
                <Checkbox onClick={(e) => e.stopPropagation()}>
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
                      <td>questionTypeId</td>
                    </tr>
                    <tr>
                      <td>{t("point", { ns: "test" })}</td>
                      <td>score</td>
                    </tr>
                    <tr>
                      <td>{t("created_at", { ns: "test" })}</td>
                      <td>
                        createdAt
                        {/* {new Date(question.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })} */}
                      </td>
                    </tr>
                    <tr>
                      <td>{t("time_limit", { ns: "test" })}</td>
                      <td>duration</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default FormInfo;
