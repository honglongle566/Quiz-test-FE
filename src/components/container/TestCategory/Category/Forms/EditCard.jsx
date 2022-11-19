import { Form, Button, Input } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { updateCategory } from "../../../../../slices/testCategory";
import { useDispatch } from "react-redux";
function EditCard({ onCancel, category }) {
  const { t } = useTranslation("category", "common");
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    return () => form.resetFields();
  });
  const onFinish = async (values) => {
    dispatch(updateCategory({ ...category, ...values }));
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
        label={t("category_name", { ns: "category" })}
        initialValue={category.name}
        rules={[
          {
            required: true,
            message: `${t("the_category_name_field_is_required", {
              ns: "category",
            })}`,
          },
        ]}
      >
        <Input placeholder={t("your_input_here", { ns: "category" })} />
      </Form.Item>
      <Form.Item className="form-footer">
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

export default EditCard;
