import {
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Collapse, Divider, Tooltip, Typography, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryGroupSelector,
  showDialog,
  removeCategoryGroup,
  removeSubject,
  updateSubject,
} from "slices/category/categoryGroup";

const { Paragraph } = Typography;
const { Panel } = Collapse;

const ListIndex = () => {
  const { t } = useTranslation("category", "common");
  const dispatch = useDispatch();
  const { categoryGroup } = useSelector(categoryGroupSelector);

  const [isExitSubCard, setIsExitSubCard] = useState("");
  const [editSub, setEditSub] = useState();
  const [subName, setSubName] = useState();

  const toggleEditSub = (id) => {
    if (editSub === id) {
      setEditSub();
    } else {
      setEditSub(id);
    }
  };

  const handleEditCard = (e, item) => {
    e.stopPropagation();
    dispatch(showDialog({ type: "EDIT_CATEGORY", item: item }));
  };

  const handleMoveSubCard = (item, subCard) => {
    dispatch(
      showDialog({ type: "MOVE_SUBJECT", item: item, subject: subCard })
    );
  };

  const handleExitSubCard = (item, subCard) => {
    setEditSub();
    dispatch(updateSubject({ item, subject: { ...subCard, name: subName } }));
  };

  const handleAddSubCard = (e, item) => {
    dispatch(showDialog({ type: "CREATE_SUBJECT", item: item }));
  };
  const handleDeleteCard = (e, item) => {
    e.stopPropagation();
    Modal.confirm({
      title: `${t("are_you_sure_delete_category", { ns: "category" })}
        ${item.name}
      `,
      icon: <ExclamationCircleOutlined />,
      okText: t("button.ok", { ns: "common" }),
      cancelText: t("button.cancel", { ns: "common" }),
      onOk: () => dispatch(removeCategoryGroup(item)),
    });
  };
  const handleDeleteSubCard = (item) => {
    Modal.confirm({
      title: `${t("are_you_sure_delete_sub_category", { ns: "category" })}
        ${item.name}
      `,
      icon: <ExclamationCircleOutlined />,
      okText: t("button.ok", { ns: "common" }),
      cancelText: t("button.cancel", { ns: "common" }),
      onOk: () => dispatch(removeSubject(item)),
    });
  };

  return (
    <div className="mt-3">
      {categoryGroup.map((item) => (
        <Collapse
          expandIconPosition="end"
          expandIcon={() => <CaretRightOutlined rotate={90} />}
          ghost
          className="mb-3 card-medium"
          key={item.id}
        >
          <Panel
            extra={[
              <Tooltip title={t("button.edit", { ns: "common" })} key={"edit"}>
                <Button type="text">
                  <EditOutlined onClick={(e) => handleEditCard(e, item)} />
                </Button>
              </Tooltip>,
              <Tooltip
                title={t("button.delete", { ns: "common" })}
                key={"delete"}
              >
                <Button type="text" danger>
                  <DeleteOutlined onClick={(e) => handleDeleteCard(e, item)} />
                </Button>
              </Tooltip>,
            ]}
            header={
              <div>
                <h4 className="font-size-medium font-weight-light">
                  {item.name}
                </h4>
                <p className="font-size-small font-weight-normal">
                  <span>
                    {item.subject.map((subCard) => subCard.name).join(", ")}
                  </span>
                </p>
              </div>
            }
          >
            {item.subject.map((subCard) => (
              <div key={subCard.id}>
                <Divider className="ma-0" />
                <div className="d-flex justify-content-between py-2">
                  <Paragraph
                    editable={{
                      onChange: (values) => setSubName(values),
                      editing: editSub === subCard.id,
                      onEnd: () => handleExitSubCard(item, subCard),
                      icon: null,
                    }}
                  >
                    {subCard.name}
                  </Paragraph>
                  {editSub === subCard.id ? (
                    <div>
                      <Button
                        className="mr-2"
                        onClick={() => toggleEditSub(subCard.id)}
                      >
                        {t("button.cancel", { ns: "common" })}
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => handleExitSubCard(item, subCard)}
                      >
                        {t("button.update", { ns: "common" })}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        type="link"
                        onClick={() => toggleEditSub(subCard.id)}
                      >
                        {t("button.edit", { ns: "common" })}
                      </Button>
                      <Button
                        type="link"
                        onClick={() => handleMoveSubCard(item, subCard)}
                      >
                        {t("button.move", { ns: "common" })}
                      </Button>
                      <Button
                        type="link"
                        danger
                        onClick={() => handleDeleteSubCard(subCard)}
                      >
                        {t("button.delete", { ns: "common" })}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              icon={<PlusCircleOutlined />}
              type="primary"
              className="btn-primary-inverse"
              onClick={(e) => handleAddSubCard(e, item)}
            >
              {t("new_sub_category2", { ns: "category" })}
            </Button>
          </Panel>
        </Collapse>
      ))}
    </div>
  );
};

export default ListIndex;
