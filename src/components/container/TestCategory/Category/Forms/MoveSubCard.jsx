import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { moveSub } from "../../../../../slices/testCategory";

const { Option } = Select;
function MoveSubCard({ onCancel, currentParent, categories, child }) {
  const { t } = useTranslation("category", "common");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(moveSub({ sub: child, new_parent_id: values.new_parent_id }));
    onCancel();
  };
  useEffect(() => {
    return () => form.resetFields();
  });

  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      form={form}
      initialValues={{ currentGroup: child.name }}
    >
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="currentGroup"
          label={t("current_category", { ns: "category" })}
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="new_parent_id"
          label={t("move_to_category", { ns: "category" })}
          rules={[
            { required: true, message: "Please select an item in the list" },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Select placeholder="-- Chọn nhóm đề thi --">
            {categories
              .filter((c) => c._id !== currentParent._id)
              .map((c) => (
                <Option value={c._id} key={c._id}>
                  {c.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
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

export default MoveSubCard;
