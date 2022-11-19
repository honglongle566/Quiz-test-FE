import {
  CalendarOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileAddFilled,
  LinkOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Row,
  Select,
  Switch,
  Tooltip,
} from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const { Search } = Input;

function TestCampaigns(props) {
  const { t } = useTranslation("testCampaign");

  const onSearch = (value) => {
    //console.log(value);
  };

  function handleChange(value) {
    //console.log(`selected ${value}`);
  }

  function onChange(checked) {
    //console.log(`switch to ${checked}`);
    message.success(t("Update_status_successfully", { ns: "testCampaign" }));
  }

  const showModalDelete = () => {
    Modal.confirm({
      title: t("Notification", { ns: "testCampaign" }),
      icon: <ExclamationCircleOutlined />,
      content: t("notifi_delete", { ns: "testCampaign" }),
      okText: t("yes", { ns: "testCampaign" }),
      cancelText: t("no", { ns: "testCampaign" }),
      onOk() {
        //console.log('delete')
      },
      maskClosable: true,
    });
  };

  const showModalCopy = () => {
    Modal.confirm({
      title: t("duplicate", { ns: "testCampaign" }),
      icon: <ExclamationCircleOutlined />,
      content: t("notifi_duplicate", { ns: "testCampaign" }),
      okText: t("Yes_duplicate_it", { ns: "testCampaign" }),
      cancelText: t("no", { ns: "testCampaign" }),
      onOk() {},
      maskClosable: true,
    });
  };

  return (
    <div className="test_campaigns container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col flex={1}>
              <h6>{t("test_campaign", { ns: "testCampaign" })}</h6>
            </Col>
            <Col>
              <Link to="create">
                <Button type="primary" icon={<PlusCircleFilled />} size="large">
                  {t("Create_test_campaign", { ns: "testCampaign" })}
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col flex={1}>
          <Search
            className="search-btn"
            size="large"
            placeholder={t("Search_test_campaign", { ns: "testCampaign" })}
            onSearch={onSearch}
          />
        </Col>
        <Col offset={12}>
          <Select
            defaultValue={1}
            className="select"
            size="large"
            style={{ width: "10rem" }}
            onChange={handleChange}
          >
            <Select.Option value={1}>
              {t("Recently_added", { ns: "testCampaign" })}
            </Select.Option>
            <Select.Option value={2}>
              {t("Alphabet", { ns: "testCampaign" })}
            </Select.Option>
          </Select>
        </Col>

        <Col span={24}>
          <div className="p-3 white-bg">
            <Row gutter={[24, 24]} justify="space-between" align="middle">
              <Col flex={1}>
                <h5>dot thi 1</h5>
                <div className="link_copy">
                  <span>
                    {" "}
                    <CalendarOutlined />{" "}
                    {t("Unlimited_Time", { ns: "testCampaign" })}
                  </span>
                  <span className="long_text">
                    {" "}
                    <LinkOutlined />{" "}
                    https://e.testcenter.vn/t/cUV6V3gOJFAOM1RcRyYED0F4SHIX
                  </span>
                </div>
              </Col>
              <Col offset={2}>
                <Tooltip
                  placement="top"
                  title={t("edit", { ns: "testCampaign" })}
                >
                  <Link to={`/test-campaigns/:id/edit`}>
                    <Button type="link">
                      <EditOutlined />
                    </Button>
                  </Link>
                </Tooltip>
                <Tooltip
                  placement="top"
                  title={t("duplicate", { ns: "testCampaign" })}
                >
                  <Button type="link" onClick={showModalCopy}>
                    <CopyOutlined />
                  </Button>
                </Tooltip>
                <Tooltip
                  placement="top"
                  title={t("delete", { ns: "testCampaign" })}
                >
                  <Button type="link" onClick={showModalDelete}>
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
                <Switch defaultChecked onChange={onChange} />
                <Link to={`/test-campaigns/:id/result`}>
                  <Button>{t("result", { ns: "testCampaign" })}</Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TestCampaigns;
