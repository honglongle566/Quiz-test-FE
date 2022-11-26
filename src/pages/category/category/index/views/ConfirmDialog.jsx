import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategoryGroup,
  categoryGroupSelector,
  addSubject,
  hiddenDialog,
  updateCategoryGroup,
  moveSubject,
} from 'slices/category/categoryGroup';
const { Option } = Select;

const ConfirmDialog = () => {
  const { t } = useTranslation('category', 'common');
  const { isDialog, typeDialog, targetItem, targetSubject, categoryGroupAll } =
    useSelector(categoryGroupSelector);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [initValueForm, setInitValueForm] = useState({});

  useEffect(() => {
    return () => form.resetFields();
  });
  useEffect(() => {
    if (typeDialog === 'MOVE_SUBJECT') {
      setInitValueForm({ currentGroup: targetItem.name });
    }
  }, [typeDialog]);

  const onFinish = async (values) => {
    if (typeDialog === 'CREATE_NEW') {
      const newCategory = {
        name: values?.name,
        subject: values?.subject
          ? values?.subject.map((c) => {
              return { name: c };
            })
          : [],
      };
      dispatch(addCategoryGroup(newCategory));
    } else if (typeDialog === 'EDIT_CATEGORY') {
      console.log('values', { ...targetItem, ...values });
      dispatch(updateCategoryGroup({ ...targetItem, ...values }));
    } else if (typeDialog === 'MOVE_SUBJECT') {
      dispatch(
        moveSubject({
          id: targetSubject.id,
          new_category_id: values.new_category_id,
        }),
      );
    } else if (typeDialog === 'CREATE_SUBJECT') {
      dispatch(
        addSubject({
          name: values?.name,
          category_id: targetItem.id,
        }),
      );
    }
  };

  const showTitle = () => {
    switch (typeDialog) {
      case 'CREATE_NEW':
        return t('create_category', { ns: 'category' });
      case 'EDIT_CATEGORY':
        return t('update_category', { ns: 'category' });
      case 'CREATE_SUBJECT':
        return t('new_sub_category1', { ns: 'category' });
      case 'MOVE_SUBJECT':
        return t('move_sub_category', { ns: 'category' });
      default:
        return 'Thông báo';
    }
  };

  const showForm = () => {
    switch (typeDialog) {
      case 'CREATE_NEW':
        return <FormAdd />;
      case 'EDIT_CATEGORY':
        return <FormEdit />;
      case 'CREATE_SUBJECT':
        return <FormSubject />;
      case 'MOVE_SUBJECT':
        return <FormMoveSubject />;
      default:
        return 'Thông báo';
    }
  };

  const FormAdd = () => {
    return (
      <>
        <Form.Item
          style={{ fontWeight: '500' }}
          name='name'
          label={t('category_name', { ns: 'category' })}
          rules={[
            {
              required: true,
              message: `${t('the_category_name_field_is_required', {
                ns: 'category',
              })}`,
            },
          ]}
        >
          <Input placeholder={t('your_input_here', { ns: 'category' })} />
        </Form.Item>
        <Form.List name='subject'>
          {(fields, { add }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  style={{ fontWeight: '500' }}
                  label={
                    index === 0
                      ? `${t('subject_name1', { ns: 'category' })}`
                      : ''
                  }
                  key={field.key}
                >
                  <Form.Item {...field} noStyle>
                    <Input
                      placeholder={t('your_input_here', { ns: 'category' })}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type='primary'
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  className='btn-primary-inverse'
                >
                  {t('new_subject1', { ns: 'category' })}
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </>
    );
  };

  const FormEdit = () => {
    return (
      <Form.Item
        style={{ fontWeight: '500' }}
        name='name'
        label={t('category_name', { ns: 'category' })}
        initialValue={targetItem?.name}
        rules={[
          {
            required: true,
            message: `${t('the_category_name_field_is_required', {
              ns: 'category',
            })}`,
          },
        ]}
      >
        <Input placeholder={t('your_input_here', { ns: 'category' })} />
      </Form.Item>
    );
  };

  const FormSubject = () => {
    return (
      <Form.Item
        style={{ fontWeight: '500' }}
        name='name'
        label='Tên danh mục con'
        rules={[
          {
            required: true,
            message: 'Tên danh mục con không được để trống',
          },
        ]}
      >
        <Input placeholder='Nhập tên danh mục con' />
      </Form.Item>
    );
  };

  const FormMoveSubject = () => {
    return (
      <>
        <Form.Item
          name='currentGroup'
          label={t('current_category', { ns: 'category' })}
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name='new_category_id'
          label={t('move_to_category', { ns: 'category' })}
          rules={[
            { required: true, message: 'Please select an item in the list' },
          ]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            margin: '0 8px',
          }}
        >
          <Select placeholder='-- Chọn nhóm đề thi --'>
            {categoryGroupAll
              .filter((item) => item.id !== targetItem.id)
              .map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      title={showTitle()}
      visible={isDialog}
      onOk={() => dispatch(hiddenDialog())}
      onCancel={() => dispatch(hiddenDialog())}
      style={{ top: 200 }}
      footer={null}
    >
      <Form
        name='testCategoryForm'
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={initValueForm}
      >
        {showForm()}
        <Form.Item className='ma-0 mt-4'>
          <div className='d-flex justify-content-end'>
            <Button
              type='default'
              htmlType='button'
              className='btn-gray mr-2'
              onClick={() => dispatch(hiddenDialog())}
            >
              {t('button.cancel', { ns: 'common' })}
            </Button>
            <Button type='primary' htmlType='submit'>
              {t('button.save', { ns: 'common' })}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ConfirmDialog;
