import {
  CaretRightOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Col, Collapse, Divider, Modal, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addQuestion,
  removeQuestionsToExam,
  testFormSelector,
} from 'slices/test/testForm';

const { Panel } = Collapse;
const { confirm } = Modal;

const FormInfo = () => {
  const { t } = useTranslation('test', 'common');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector(testFormSelector);

  const handleCopy = (e, item) => {
    e.stopPropagation();
    dispatch(addQuestion(item));
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    confirm({
      title: t('Notification', { ns: 'bank' }),
      icon: <ExclamationCircleOutlined />,
      content: t('Are_you_sure_want_to_remove_selected_questions', {
        ns: 'bank',
      }),
      okText: t('Yes', { ns: 'bank' }),
      cancelText: t('Cancel', { ns: 'bank' }),

      onOk() {
        dispatch(removeQuestionsToExam(id));
      },

      onCancel() {},
    });
  };
  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/bank/question/${id}/edit`);
  };
  return (
    <Row span={24}>
      <Col span={24} className='mt-3'>
        {list.map((item, index) => (
          <Collapse
            expandIconPosition='end'
            expandIcon={() => <CaretRightOutlined rotate={90} />}
            ghost
            className='card-medium mb-3'
            key={item.id}
          >
            <Panel
              key={1}
              extra={[
                <Tooltip key={1} title={t('button.update', { ns: 'common' })}>
                  <Button type='text' onClick={(e) => handleEdit(e, item.id)}>
                    <EditOutlined />
                  </Button>
                </Tooltip>,
                <Tooltip
                  key={2}
                  title={t('button.duplicate', { ns: 'common' })}
                >
                  <Button type='text' onClick={(e) => handleCopy(e, item)}>
                    <CopyOutlined />
                  </Button>
                </Tooltip>,
                <Tooltip key={3} title={t('button.delete', { ns: 'common' })}>
                  <Button
                    type='text'
                    danger
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                    <DeleteOutlined />
                  </Button>
                </Tooltip>,
              ]}
              header={
                <div className='d-flex'>
                  <div className='mr-3'>
                    <b>{`${t('Question', { ns: 'bank' })} ${index + 1}`}:</b>
                  </div>
                  <div
                    className='font-weight-light'
                    dangerouslySetInnerHTML={{ __html: item.name }}
                  ></div>
                </div>
              }
            >
              <Divider />
              <Row justify='center'></Row>
            </Panel>
          </Collapse>
        ))}
      </Col>
    </Row>
  );
};

export default FormInfo;
