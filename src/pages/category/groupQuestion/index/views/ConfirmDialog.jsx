import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestionGroup,
  hiddenDialog,
  questionGroupsSelector,
} from "slices/category/questionGroup";

const ConfirmDialog = ({}) => {
  const { t } = useTranslation("category", "common");
  const { isDialog } = useSelector(questionGroupsSelector);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  useEffect(() => {
    return () => form.resetFields();
  });

  const onFinish = (values) => {
    dispatch(addQuestionGroup(values));
  };
  return (
    <Modal
      title={t("create_category", { ns: "category" })}
      visible={isDialog}
      onOk={() => dispatch(hiddenDialog())}
      onCancel={() => dispatch(hiddenDialog())}
      style={{ top: 200 }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        class="modal-content"
      >
        <Form.Item
          style={{ fontWeight: "500" }}
          name="name"
          label={t("tag_name", { ns: "category" })}
          rules={[
            {
              required: true,
              message: `${t("the_tag_name_field_is_required", {
                ns: "category",
              })}`,
            },
          ]}
        >
          <Input
            placeholder={t("your_input_here", {
              ns: "category",
            })}
          />
        </Form.Item>
        <Form.Item className="ma-0 mt-4">
          <div className="d-flex justify-content-end">
            <Button
              type="default"
              htmlType="button"
              className="btn-gray mr-2"
              onClick={() => dispatch(hiddenDialog())}
            >
              {t("button.cancel", { ns: "common" })}
            </Button>
            <Button type="primary" htmlType="submit">
              {t("button.save", { ns: "common" })}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ConfirmDialog;
