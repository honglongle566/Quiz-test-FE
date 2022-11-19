import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  deleteQuestionGroup,
  updateQuestionGroup,
} from "../../../../slices/category/questionGroup";
const { Paragraph } = Typography;

function QuestionItem({ group }) {
  const { t } = useTranslation("category", "common");
  const [questionName, setQuestionName] = useState(group?.name);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const onRemove = () => {
    Modal.confirm({
      title: `${t("are_you_sure_delete_question_group", { ns: "category" })} ${
        group.name
      }`,
      icon: <ExclamationCircleOutlined />,
      okText: t("button.ok", { ns: "common" }),
      cancelText: t("button.cancel", { ns: "common" }),
      onOk: onOk,
    });
  };
  const onOk = () => {
    dispatch(deleteQuestionGroup(group._id));
  };
  const switchEditMode = () => {
    setQuestionName(group?.name);
    setEditMode(!editMode);
  };
  const onEditEnd = async () => {
    dispatch(updateQuestionGroup({ ...group, name: questionName }));
    setEditMode(!editMode);
  };
  useEffect(() => {
    setQuestionName(group?.name);
  }, []);
  return (
    <div className="question">
      <div className="question-item">
        <div className="question-item-header">
          <Paragraph
            editable={{
              editing: editMode,
              onChange: setQuestionName,
              onEnd: () => setEditMode(!editMode),
            }}
          >
            {questionName}
          </Paragraph>
        </div>
        {editMode ? (
          <div className="edit-mode">
            <Button className="btn-gray" onClick={switchEditMode}>
              {t("button.cancel", { ns: "common" })}
            </Button>
            <Button onClick={onEditEnd}>
              {t("button.update", { ns: "common" })}
            </Button>
          </div>
        ) : (
          <div className="question-item-option">
            <Tooltip title={t("button.update", { ns: "common" })}>
              <EditOutlined onClick={switchEditMode} />
            </Tooltip>
            <Tooltip title={t("button.delete", { ns: "common" })}>
              <DeleteOutlined onClick={onRemove} />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionItem;
