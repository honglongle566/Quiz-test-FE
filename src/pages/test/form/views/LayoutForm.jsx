import {
  EditOutlined,
  SettingFilled,
  QuestionCircleOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  ForkOutlined,
  FileDoneOutlined,
  DownOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Col,
  Menu,
  Row,
  Space,
  Tooltip,
  Typography,
  Divider,
  Button,
  Dropdown,
} from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import ConfirmDialog from "./ConfirmDialog";
import FormInfo from "./FormInfo";

const LayoutForm = () => {
  const { t } = useTranslation("test");
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/tests">Đề Thi</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>name</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Typography.Title level={3}>test</Typography.Title>
            </Col>
            <Col>
              <Space size="large">
                <Tooltip title={t("update_test_infomation", { ns: "test" })}>
                  <EditOutlined style={{ fontSize: "16px" }} />
                </Tooltip>
                <Tooltip title={t("test_setting", { ns: "test" })}>
                  <SettingFilled style={{ fontSize: "16px" }} />
                </Tooltip>
              </Space>
            </Col>
          </Row>
          <Divider className="ma-0 pa-0" />
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} align="middle" justify="space-between">
            <Col span={14}>
              <Row gutter={16}>
                <Col>
                  <QuestionCircleOutlined style={{ marginRight: 4 }} />
                  <span>{t("question", { ns: "test" })}</span>
                </Col>
                <Col>
                  <TrophyOutlined style={{ marginRight: 4 }} />
                  <span>{t("point", { ns: "test" })}</span>
                </Col>
                <Col>
                  <ClockCircleOutlined style={{ marginRight: 4 }} />
                  <span>{`${t("no_time_limit", { ns: "test" })}`}</span>
                </Col>
                <Col>
                  <FileTextOutlined style={{ marginRight: 4 }} />
                  <span>
                    {t("show_all_questions_per_page", { ns: "test" })}
                  </span>
                </Col>
                <Col>
                  <ForkOutlined style={{ marginRight: 4 }} />
                  <span>{t("shuffle_question", { ns: "test" })}</span>
                </Col>
              </Row>
            </Col>
            <Col>
              <Link to="/tests/12/result" className="link mr-2">
                <Button size="large">
                  <FileDoneOutlined />
                  <Typography.Text>
                    {t("view_result", { ns: "test" })}
                  </Typography.Text>
                </Button>
              </Link>
              <Dropdown.Button
                overlay={
                  <Menu
                    items={[
                      {
                        key: "1",
                        label: (
                          <Link to="/questions">
                            {t("add_new_question", { ns: "test" })}
                          </Link>
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <Link to="/questions">
                            {t("my_question_bank", { ns: "test" })}
                          </Link>
                        ),
                      },
                    ]}
                  />
                }
                icon={<DownOutlined />}
                type="primary"
                size="large"
              >
                <PlusCircleOutlined />
                <Typography.Text style={{ color: "#fff" }}>
                  {t("add_question", { ns: "test" })}
                </Typography.Text>
              </Dropdown.Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <FormInfo />
      {/* <ConfirmDialog /> */}
    </div>
  );
};

export default LayoutForm;
