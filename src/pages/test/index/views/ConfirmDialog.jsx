import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  TreeSelect,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const { TreeNode } = TreeSelect;

const ConfirmDialog = () => {
  const { t } = useTranslation("test", "common");
  const [form] = Form.useForm();
  const [category, setCategory] = useState();
  const onFinish = (values) => {};
  const [isAddTest, setIsAddTest] = useState(false);
  return (
    <Modal
      title={t("create_new_test", { ns: "test" })}
      onOk={() => setIsAddTest(false)}
      onCancel={() => setIsAddTest(false)}
      visible={isAddTest}
      style={{ top: 25 }}
      footer={null}
    >
      <Form name="tests" form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          style={{ fontWeight: "500" }}
          name="name"
          label={t("test_name", { ns: "test" })}
          rules={[
            {
              required: true,
              message: `${t("this_is_required_information", { ns: "test" })}`,
            },
          ]}
        >
          <Input placeholder={t("your_input_here", { ns: "test" })} />
        </Form.Item>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item
              label={t("category", { ns: "test" })}
              style={{ fontWeight: "500" }}
              name="subExamGroupId"
              rules={[
                {
                  required: true,
                  message: `${t("this_is_required_information", {
                    ns: "test",
                  })}`,
                },
              ]}
            >
              <TreeSelect
                style={{ width: "100%" }}
                value={category}
                dropdownStyle={{ maxHeight: 600, overflow: "auto" }}
                placeholder={t("choose_an_category", { ns: "test" })}
                treeDefaultExpandAll
                onChange={(value) => setCategory(value)}
              >
                <TreeNode
                  value={"exam.id + exam.name"}
                  title={"exam.name"}
                  selectable={false}
                  key={"exam.id + exam.name"}
                >
                  <TreeNode
                    value={"subExam.id"}
                    title={"subExam.name"}
                    key={"subExam.id"}
                  ></TreeNode>
                </TreeNode>
              </TreeSelect>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={t("language_setting", { ns: "test" })}
              style={{ fontWeight: "500" }}
              name="language"
              rules={[
                {
                  required: true,
                  message: `${t("this_is_required_information", {
                    ns: "test",
                  })}`,
                },
              ]}
              initialValue="Tiếng Anh"
            >
              <Select placeholder={t("choose_an_category", { ns: "test" })}>
                <Select.Option value="VN">Tiếng Việt</Select.Option>
                <Select.Option value="EN">Tiếng Anh</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="description"
          label={t("description", { ns: "test" })}
          style={{ fontWeight: "500" }}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <Button type="default" htmlType="button" className="mr-2">
            {t("button.cancel", { ns: "common" })}
          </Button>
          <Button type="primary" htmlType="submit">
            {t("button.save", { ns: "common" })}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ConfirmDialog;
