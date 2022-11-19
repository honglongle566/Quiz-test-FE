import {
  ClockCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  ForkOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  TrophyOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Dropdown,
  Modal,
  Row,
  Select,
  Typography,
  Collapse,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AddRandomQuestion from "../Forms/AddRandomQuestion";
import AddMenu from "../Menu/AddMenu";
import DragItem from "./DragItem";
function TestDrag() {
  const { t } = useTranslation("test", "common");
  const [checkAll, setCheckAll] = useState(false);
  const [checkOption, setCheckOption] = useState("none");
  const [randomQues, setRandomQues] = useState(false);
  const [addQuesDropDown, setAddQuesDropDown] = useState(false);
  const handleOnDragEnd = (result) => {};
  const onCheck = (e) => {
    setCheckAll(e.target.checked);
  };
  const onSelect = (e) => {
    if (e === "remove") {
      setCheckOption("remove");
      Modal.confirm({
        title: `${t("do_you_want_to_remove_selected_question", {
          ns: "test",
        })}`,
        icon: <ExclamationCircleOutlined />,
        okText: `${t("Ok", { ns: "test" })}`,
        cancelText: `${t("Cancel", { ns: "test" })}`,
        onOk: onOkDelete,
        afterClose: () => {
          setCheckOption("none");
          Modal.destroyAll();
        },
      });
    }
  };
  const onOkDelete = (e) => {
    setCheckOption("none");
    Modal.destroyAll();
  };
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
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
                <span>{t("show_all_questions_per_page", { ns: "test" })}</span>
              </Col>
              <Col>
                <ForkOutlined style={{ marginRight: 4 }} />
                <span>{t("shuffle_question", { ns: "test" })}</span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Link to="/tests/12/result" className="link">
              <FileDoneOutlined />
              <Typography.Text>
                {t("view_result", { ns: "test" })}
              </Typography.Text>
            </Link>
            <Dropdown.Button
              overlay={
                <AddMenu
                  addRandomQues={() => setRandomQues(true)}
                  closeDropDown={() => setAddQuesDropDown(false)}
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
      <Col span={24}>
        <Row align="middle" justify="start" gutter={24}>
          <Col style={{ marginLeft: 18 }}>
            <Checkbox onChange={onCheck} checked={checkAll}>
              <Typography.Title level={5}>
                {t("check_all", { ns: "test" })}
              </Typography.Title>
            </Checkbox>
          </Col>
          <Col>
            <Select
              style={{ width: 120 }}
              onChange={onSelect}
              value={checkOption}
            >
              <Select.Option value="none">
                {t("select", { ns: "test" })}
              </Select.Option>
              <Select.Option value="remove">
                {t("remove", { ns: "test" })}
              </Select.Option>
            </Select>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Collapse
          expandIconPosition="end"
          expandIcon={() => <CaretRightOutlined rotate={90} />}
          ghost
          onChange={onChange}
        >
          <DragItem key={1} />
          <DragItem key={2} />
        </Collapse>

        <AddRandomQuestion rmvRandomQues={() => setRandomQues(false)} />
      </Col>
    </>
  );
}

export default TestDrag;
