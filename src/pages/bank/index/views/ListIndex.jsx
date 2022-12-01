import {
  CaretDownOutlined,
  ExclamationCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import {
  Checkbox,
  Collapse,
  Divider,
  Tooltip,
  Button,
  Row,
  Col,
  Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';
import MultipleChoice from './Answer/MultipleChoice';
import TrueFalse from './Answer/TrueFalse';
import FillingBlank from './Answer/FillingBlank';
import QuestionInfo from './QuestionInfo';
import { useState } from 'react';
import {
  bankIndexSliceSelector,
  removeQuestion,
  duplicateQuestion,
  removeQuestionsToExam,
  addQuestionsToExam,
} from 'slices/bank/bankIndex';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Panel } = Collapse;
const { confirm } = Modal;

const ListIndex = () => {
  const { t } = useTranslation('bank');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, isPage, questionChecked } = useSelector(bankIndexSliceSelector);
  const [checkAll, setCheckAll] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const handleMassDelete = (e) => {};
  const handleCopy = (e, item) => {
    e.stopPropagation();
    dispatch(duplicateQuestion(item));
    // navigate(`/bank/question/${item.id}/edit`);
  };
  const handleAddQuestionsToExam = (e, id) => {
    e.stopPropagation();
    dispatch(addQuestionsToExam(id));
  };
  const handleRemoveQuestionsToExam = (e, id) => {
    e.stopPropagation();
    dispatch(removeQuestionsToExam(id));
  };
  const handleDelete = (e, item) => {
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
        dispatch(removeQuestion(item));
      },

      onCancel() {},
    });
  };
  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/bank/question/${id}/edit`);
  };
  return (
    <div>
      <Checkbox checked={checkAll} className='checkAll'>
        {checkAll
          ? t('Uncheck_all', { ns: 'bank' })
          : t('Check_all', { ns: 'bank' })}
      </Checkbox>
      {showOption && (
        <select onChange={handleMassDelete} className='check-option'>
          <option key='option' value='option'>
            {t('Select', { ns: 'bank' })}
          </option>
          <option key='delete' value='delete'>
            {t('Delete', { ns: 'bank' })}
          </option>
        </select>
      )}
      <div className='mt-3'>
        {list.map((item, index) => (
          <Collapse
            expandIconPosition='end'
            expandIcon={() => <CaretRightOutlined rotate={90} />}
            ghost
            className='mb-3 card-medium'
            key={index}
          >
            <Panel
              key={index}
              extra={
                isPage === 'CREATE'
                  ? [
                      questionChecked.includes(item.id) ? (
                        <Button
                          key='deleteExam'
                          danger
                          onClick={(e) =>
                            handleRemoveQuestionsToExam(e, item.id)
                          }
                        >
                          Xóa Khỏi Đề Thi
                        </Button>
                      ) : (
                        <Button
                          type='primary'
                          ghost
                          key='addExam'
                          onClick={(e) => handleAddQuestionsToExam(e, item.id)}
                        >
                          Thêm Vào Đề Thi
                        </Button>
                      ),
                    ]
                  : [
                      <Tooltip title={t('Update', { ns: 'bank' })} key='Update'>
                        <Button
                          type='text'
                          onClick={(e) => handleEdit(e, item.id)}
                        >
                          <EditOutlined />
                        </Button>
                      </Tooltip>,
                      <Tooltip
                        title={t('Duplicate', { ns: 'bank' })}
                        key='Duplicate'
                      >
                        <Button
                          type='text'
                          onClick={(e) => handleCopy(e, item)}
                        >
                          <CopyOutlined />
                        </Button>
                      </Tooltip>,
                      <Tooltip title={t('Delete', { ns: 'bank' })} key='Delete'>
                        <Button
                          type='text'
                          danger
                          onClick={(e) => handleDelete(e, item)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Tooltip>,
                    ]
              }
              header={
                <div className='d-flex'>
                  <div className='mr-3'>
                    <Checkbox
                      value={123}
                      checked={false}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      className='mr-2'
                    />
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
              <Row justify='center'>
                <Col span={20}>
                  <Row>
                    <Col span={12}>
                      <MultipleChoice />
                    </Col>
                    {/* <Col span={12}>
                      <TrueFalse question={item} />
                    </Col>

                    <Col span={12}>
                      <FillingBlank question={item} />
                    </Col> */}
                    <Col span={12}>
                      <QuestionInfo />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        ))}
      </div>
    </div>
  );
};

export default ListIndex;
