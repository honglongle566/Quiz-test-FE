import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  TreeSelect,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExam,
  hiddenDialog,
  testIndexSelector,
} from 'slices/test/testIndex';
const { TreeNode } = TreeSelect;

const ConfirmDialog = () => {
  const { t } = useTranslation('test', 'common');
  const dispatch = useDispatch();
  const { isDialog, category } = useSelector(testIndexSelector);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(addExam(values));
  };
  return (
    <Modal
      title={t('create_new_test', { ns: 'test' })}
      visible={isDialog}
      onCancel={() => dispatch(hiddenDialog())}
      style={{ top: 25 }}
      footer={null}
    >
      <Form name='tests' form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          style={{ fontWeight: '500' }}
          name='name'
          label={t('test_name', { ns: 'test' })}
          rules={[
            {
              required: true,
              message: `${t('this_is_required_information', { ns: 'test' })}`,
            },
          ]}
        >
          <Input placeholder={t('your_input_here', { ns: 'test' })} />
        </Form.Item>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item
              label={t('category', { ns: 'test' })}
              style={{ fontWeight: '500' }}
              name='subject_id'
              rules={[
                {
                  required: true,
                  message: `${t('this_is_required_information', {
                    ns: 'test',
                  })}`,
                },
              ]}
            >
              <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
                placeholder={t('choose_an_category', { ns: 'test' })}
                treeDefaultExpandAll
              >
                {category.map((item) => (
                  <TreeNode
                    value={'exam' + item.id}
                    title={item.name}
                    selectable={false}
                    key={'exam' + item.id}
                  >
                    {item?.subjects.map((sub) => (
                      <TreeNode
                        value={sub.id}
                        title={sub.name}
                        key={sub.id}
                      ></TreeNode>
                    ))}
                  </TreeNode>
                ))}
              </TreeSelect>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={t('language_setting', { ns: 'test' })}
              style={{ fontWeight: '500' }}
              name='language'
              rules={[
                {
                  required: true,
                  message: `${t('this_is_required_information', {
                    ns: 'test',
                  })}`,
                },
              ]}
              initialValue='Tiếng Anh'
            >
              <Select placeholder={t('choose_an_category', { ns: 'test' })}>
                <Select.Option value='VN'>Tiếng Việt</Select.Option>
                <Select.Option value='EN'>Tiếng Anh</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          style={{ fontWeight: '500' }}
          name='time_limit'
          label='Thời gian làm bài (phút)'
          rules={[
            {
              type: 'number',
              min: 0,
              max: 999999,
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name='type' label='Cài đặt hiển thị'>
          <Radio.Group>
            <Radio value={1}>Hiển thị một câu hỏi trên một trang</Radio>
            <Radio value={2}>Hiển thị một phần thi trên một trang</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='description'
          label={t('description', { ns: 'test' })}
          style={{ fontWeight: '500' }}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <div className='d-flex justify-content-end'>
          <Button
            type='default'
            htmlType='button'
            className='mr-2'
            onClick={() => dispatch(hiddenDialog())}
          >
            {t('button.cancel', { ns: 'common' })}
          </Button>
          <Button type='primary' htmlType='submit'>
            {t('button.save', { ns: 'common' })}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ConfirmDialog;
