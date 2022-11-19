import {
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Breadcrumb,
  Button,
  Col,
  Input,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import SendMail from "../../components/container/Test/TestResult/Forms/SendMail";
// import TestResultTable from "../../components/container/Test/TestResult/TestResultTable";
const { Search } = Input;

const ReviewInfo = () => {
  const { t } = useTranslation("test");
  const { id } = useParams();
  const [mailModal, setMailModal] = useState(false);
  const [orderBy, setOrderBy] = useState("latest");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const onSearch = (value) => {
    setKeyword(value);
  };
  const onSelectChange = (value) => {
    setOrderBy(value);
  };
  const onSendMail = () => {
    setMailModal(true);
  };
  const onDelete = (id) => {
    Modal.confirm({
      title: `${t("Do_you_want_to_remove_the_result?", { ns: "test" })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t("button.ok", { ns: "common" })}`,
      cancelText: `${t("button.cancel", { ns: "common" })}`,
      onOk: () => onDeleteOK(id),
    });
  };

  const onDeleteOK = (id) => {};

  const showEvaluate = () => {
    return (
      <Space size="middle">
        <Badge
          count={t("need_grade", { ns: "statistic" })}
          style={{
            backgroundColor: "#dc3545",
          }}
        ></Badge>
      </Space>
    );
    return (
      <Space size="middle">
        <Badge
          count={t("passed", { ns: "statistic" })}
          style={{
            backgroundColor: "#06ba02",
          }}
        ></Badge>
      </Space>
    );
    return (
      <Space size="middle">
        <Badge
          count={t("failed", { ns: "statistic" })}
          style={{
            backgroundColor: "#1b2150",
          }}
        ></Badge>
      </Space>
    );
  };

  return (
    <div className="container tab-style test-result">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/tests">{t("tests", { ns: "test" })}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/tests/tests.id/edit`}>name</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {t("test_result", { ns: "test" })}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} align="middle" justify="space-between">
            <Col md={8}>
              <Typography.Title level={4}>Minh Quang</Typography.Title>
            </Col>
            <Col md={16}>
              <Row gutter={8} align="middle" justify="end">
                <Select
                  className="select"
                  placeholder={t("latest", { ns: "test" })}
                  defaultValue="latest"
                  onChange={onSelectChange}
                  style={{ width: "8rem" }}
                  size="large"
                >
                  <Select.Option value="latest">
                    {t("latest", { ns: "test" })}
                  </Select.Option>
                  <Select.Option value="highest_score">
                    {t("highest_score", { ns: "test" })}
                  </Select.Option>
                  <Select.Option value="lowest_score">
                    {t("lowest_score", { ns: "test" })}
                  </Select.Option>
                </Select>
                <Col>
                  <Search
                    className="search-btn"
                    size="large"
                    onSearch={onSearch}
                    style={{ width: 350 }}
                    defaultValue=""
                    placeholder={t("search_the_answer_sheet", { ns: "test" })}
                  />
                </Col>
                <Col>
                  <Space>
                    <Button
                      onClick={onSendMail}
                      icon={
                        <Tooltip
                          title={t("send_results_by_email", { ns: "test" })}
                        >
                          <MailOutlined />
                        </Tooltip>
                      }
                      type="primary"
                      size="large"
                      // loading={isLoading}
                    />
                    <Button
                      icon={
                        <Tooltip title={t("export_file", { ns: "test" })}>
                          <DownloadOutlined />
                        </Tooltip>
                      }
                      type="primary"
                      size="large"
                      // loading={isLoading}
                    />
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="table-box">
            <table>
              <thead className="ant-table-thead">
                <tr>
                  <th>{t("INFORMATION_CONTESTANTS", { ns: "test" })}</th>
                  <th>{t("COMPLETE_PERCENT", { ns: "test" })}</th>
                  <th>{t("RESULT", { ns: "test" })}</th>
                  <th>{t("DURATION", { ns: "test" })}</th>
                  <th>{t("CREATED_AT", { ns: "test" })}</th>
                  <th></th>
                  <th>{t("ACTION", { ns: "test" })}</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                <tr>
                  <td>fullname</td>
                  <td>
                    <Progress percent={10} />
                  </td>
                  <td>score</td>
                  <td>time_do_test</td>
                  <td>createdAt</td>
                  <td>{showEvaluate()}</td>
                  <td>
                    <Space size="middle">
                      <Link to={`/results/record.id`} className="btn-link">
                        {t("View_Detail", { ns: "test" })}
                      </Link>
                      <Button icon={<DeleteOutlined />} type="text"></Button>
                    </Space>
                  </td>
                </tr>
                <tr>
                  <td>fullname</td>
                  <td>
                    <Space size="middle">
                      <p>10</p>
                      <progress value={10} max={100} />
                    </Space>
                  </td>
                  <td>score</td>
                  <td>time_do_test</td>
                  <td>createdAt</td>
                  <td>{showEvaluate()}</td>
                  <td>
                    <Space size="middle">
                      <Link to={`/results/record.id`} className="btn-link">
                        {t("View_Detail", { ns: "test" })}
                      </Link>
                      <Button icon={<DeleteOutlined />} type="text"></Button>
                    </Space>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
      {/* <Modal
        title={t("send_results_by_email", { ns: "test" })}
        visible={mailModal}
        onCancel={() => setMailModal(false)}
        style={{ top: 25 }}
        footer={null}
      >
        <SendMail closeModal={() => setMailModal(false)} />
      </Modal> */}
    </div>
  );
};

export default ReviewInfo;
