import { Form, Button, Input } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createSub } from "../../../../../slices/testCategory";

function AddSubCard({ onCancel, parent }) {
  const { t } = useTranslation("category", "common");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => form.resetFields();
  });
  const onFinish = async (values) => {
    dispatch(createSub({ ...values, test_category_id: parent._id }));
    onCancel();
  };
  return (
    <Form
      name="testChildGroupForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        style={{ fontWeight: "500" }}
        name="name"
        label={t("sub_category_name2", { ns: "category" })}
        rules={[
          {
            required: true,
            message: `${t("the_category_name_field_is_required", {
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
      <Form.Item className="form-footer ">
        <Button
          type="default"
          htmlType="button"
          className="btn-gray"
          onClick={onCancel}
        >
          {t("button.cancel", { ns: "common" })}
        </Button>
        <Button type="primary" htmlType="submit">
          {t("button.save", { ns: "common" })}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddSubCard;
