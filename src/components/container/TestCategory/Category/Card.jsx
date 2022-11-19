import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Collapse, Divider, Modal, Tooltip, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  deleteCategory,
  deleteSub,
  updateSub,
} from "../../../../slices/testCategory";
const { Paragraph } = Typography;
const { Panel } = Collapse;

function Card({
  key,
  data,
  onShowExitCard,
  onShowMoveCard,
  onShowAddSubCard,
  setCategory,
  setSubCategory,
  ...props
}) {
  const { t } = useTranslation("category", "common");
  const [isExitSubCard, setIsExitSubCard] = useState("");
  const [subName, setSubName] = useState();
  const dispatch = useDispatch();

  const handleEditCard = (e) => {
    e.stopPropagation();
    setCategory(data);
    onShowExitCard();
  };

  const handleDeleteCard = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: `${t("are_you_sure_delete_category", { ns: "category" })} 
      ${data.name}
      `,
      icon: <ExclamationCircleOutlined />,
      okText: t("button.ok", { ns: "common" }),
      cancelText: t("button.cancel", { ns: "common" }),
      onOk: onDeleteCard,
    });
  };

  const onDeleteCard = () => {
    dispatch(deleteCategory(data));
  };

  const handleDeleteSubCard = (subCard) => {
    Modal.confirm({
      title: `${t("are_you_sure_delete_sub_category", { ns: "category" })}
        child.name
      `,
      icon: <ExclamationCircleOutlined />,
      okText: t("button.ok", { ns: "common" }),
      cancelText: t("button.cancel", { ns: "common" }),
      onOk: () => onDeleteSubCard(subCard),
    });
  };

  const onDeleteSubCard = (subCard) => {
    dispatch(deleteSub(subCard));
  };

  const handleMoveSubCard = (subCard) => {
    setCategory(data);
    setSubCategory(subCard);
    onShowMoveCard();
  };

  const handleExitSubCard = (subCard) => {
    console.log("subName", subName);
    dispatch(updateSub({ ...subCard, name: subName }));
    setIsExitSubCard("");
  };

  const handleAddSubCard = () => {
    setCategory(data);
    onShowAddSubCard();
  };

  return (
    <Panel
      key={key}
      {...props}
      extra={[
        <Tooltip title={t("button.edit", { ns: "common" })} key={"edit"}>
          <EditOutlined onClick={handleEditCard} />
        </Tooltip>,
        <Tooltip title={t("button.delete", { ns: "common" })} key={"delete"}>
          <DeleteOutlined onClick={handleDeleteCard} />
        </Tooltip>,
      ]}
      header={
        <div className="pannel-header">
          <h4 className="header">{data.name}</h4>
          <p className="child">
            <span>
              {data?.sub_categories.map((subCard) => subCard.name).join(", ")}
            </span>
          </p>
        </div>
      }
    >
      {data?.sub_categories.map((subCard) => (
        <div key={subCard._id}>
          <Divider className="divider-m-none" />
          <div className="test-item">
            <Paragraph
              editable={{
                onChange: (values) => setSubName(values),
                editing: isExitSubCard === subCard._id,
              }}
              className="header"
            >
              {subCard.name}
            </Paragraph>
            {isExitSubCard === subCard._id ? (
              <div className="edit-mode">
                <Button
                  className="btn-gray"
                  onClick={() => setIsExitSubCard("")}
                >
                  {t("button.cancel", { ns: "common" })}
                </Button>
                <Button onClick={() => handleExitSubCard(subCard)}>
                  {t("button.update", { ns: "common" })}
                </Button>
              </div>
            ) : (
              <div className="option">
                <div
                  className="edit"
                  onClick={() => setIsExitSubCard(subCard._id)}
                >
                  {t("button.edit", { ns: "common" })}
                </div>
                <div
                  className="move"
                  onClick={() => handleMoveSubCard(subCard)}
                >
                  {t("button.move", { ns: "common" })}
                </div>
                <div
                  className="delete"
                  onClick={() => handleDeleteSubCard(subCard)}
                >
                  {t("button.delete", { ns: "common" })}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <Button
        icon={<PlusCircleOutlined />}
        type="primary"
        className="btn-primary-inverse"
        onClick={handleAddSubCard}
      >
        {t("new_sub_category2", { ns: "category" })}
      </Button>
    </Panel>
  );
}
export default Card;
