import { Form, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { addCategory } from "../../../../../slices/testCategory";
import { useDispatch } from "react-redux";

function AddCard({ onCancel }) {
  const { t } = useTranslation("category", "common");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => form.resetFields();
  });

  const onFinish = async (values) => {
    const newCategory = {
      name: values?.name,
      sub_category: values?.sub_category
        ? values?.sub_category.map((c) => {
            return { name: c };
          })
        : [],
    };
    dispatch(addCategory(newCategory));
    onCancel();
  };
  return (
    <Form
      name="testCategoryForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        style={{ fontWeight: "500" }}
        name="name"
        label={t("category_name", { ns: "category" })}
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
      <Form.List name="sub_category">
        {(fields, { add }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                style={{ fontWeight: "500" }}
                label={
                  index === 0
                    ? `${t("sub_category_name1", { ns: "category" })}`
                    : ""
                }
                key={field.key}
              >
                <Form.Item {...field} noStyle>
                  <Input
                    placeholder={t("your_input_here", { ns: "category" })}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="primary"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
                className="btn-primary-inverse"
              >
                {t("new_sub_category1", { ns: "category" })}
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
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

export default AddCard;
