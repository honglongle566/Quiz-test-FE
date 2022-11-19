import {
  CaretDownOutlined,
  ExclamationCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Collapse,
  Divider,
  Tooltip,
  Button,
  Row,
  Col,
  Modal,
} from "antd";
import { useTranslation } from "react-i18next";
import MultipleChoice from "./Answer/MultipleChoice";
import TrueFalse from "./Answer/TrueFalse";
import FillingBlank from "./Answer/FillingBlank";
import QuestionInfo from "./QuestionInfo";
import { useState } from "react";
import { bankIndexSliceSelector } from "slices/bank/bankIndex";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;
const { confirm } = Modal;

const ListIndex = () => {
  const { t } = useTranslation("bank");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector(bankIndexSliceSelector);
  const [checkAll, setCheckAll] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const handleMassDelete = (e) => {};
  const handleCopy = (e, id) => {
    e.stopPropagation();
    navigate(`/bank/question/${id}/edit`);
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    confirm({
      title: t("Notification", { ns: "bank" }),
      icon: <ExclamationCircleOutlined />,
      content: t("Are_you_sure_want_to_remove_selected_questions", {
        ns: "bank",
      }),
      okText: t("Yes", { ns: "bank" }),
      cancelText: t("Cancel", { ns: "bank" }),

      onOk() {},

      onCancel() {},
    });
  };
  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/bank/question/${id}/edit`);
  };
  return (
    <div>
      <Checkbox checked={checkAll} className="checkAll">
        {checkAll
          ? t("Uncheck_all", { ns: "bank" })
          : t("Check_all", { ns: "bank" })}
      </Checkbox>
      {showOption && (
        <select onChange={handleMassDelete} className="check-option">
          <option value="option">{t("Select", { ns: "bank" })}</option>
          <option value="delete">{t("Delete", { ns: "bank" })}</option>
        </select>
      )}
      <div className="mt-3">
        {list.map((item, index) => (
          <Collapse
            expandIconPosition="end"
            expandIcon={() => <CaretRightOutlined rotate={90} />}
            ghost
            className="mb-3 card-medium"
            key={item.id}
          >
            <Panel
              extra={[
                <Tooltip title={t("Update", { ns: "bank" })}>
                  <Button type="text" onClick={(e) => handleEdit(e, item.id)}>
                    <EditOutlined />
                  </Button>
                </Tooltip>,
                <Tooltip title={t("Duplicate", { ns: "bank" })}>
                  <Button type="text" onClick={(e) => handleCopy(e, item.id)}>
                    <CopyOutlined />
                  </Button>
                </Tooltip>,
                <Tooltip title={t("Delete", { ns: "bank" })}>
                  <Button
                    type="text"
                    danger
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                    <DeleteOutlined />
                  </Button>
                </Tooltip>,
              ]}
              header={
                <div className="d-flex">
                  <div className="mr-3">
                    <Checkbox
                      value={123}
                      checked={false}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      className="mr-2"
                    />
                    <b>{`${t("Question", { ns: "bank" })} ${index + 1}`}:</b>
                  </div>
                  <div
                    className="font-weight-light"
                    dangerouslySetInnerHTML={{ __html: item.name }}
                  ></div>
                </div>
              }
            >
              <Divider />
              <Row justify="center">
                <Col span={20}>
                  <Row>
                    <Col span={12}>
                      <MultipleChoice />
                    </Col>
                    {/* <Col span={12}>
                      <TrueFalse question={item} />
                    </Col>

                    <Col span={12}>
                      <FillingBlank question={item} />
                    </Col> */}
                    <Col span={12}>
                      <QuestionInfo />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        ))}
      </div>
    </div>
  );
};

export default ListIndex;
