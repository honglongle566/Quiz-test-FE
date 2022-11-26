import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  questionGroupsSelector,
  removeQuestionGroup,
  updateQuestionGroup,
} from 'slices/category/questionGroup';

const { Paragraph } = Typography;

const ListIndex = () => {
  const { t } = useTranslation('category', 'common');
  const dispatch = useDispatch();
  const { questionGroups } = useSelector(questionGroupsSelector);

  const [questionName, setQuestionName] = useState();
  const [editMode, setEditMode] = useState();
  const toggleEditMode = (id) => {
    if (editMode === id) {
      setEditMode();
    } else {
      setEditMode(id);
    }
  };
  const onEdit = (item) => {
    setEditMode();
    dispatch(updateQuestionGroup({ ...item, name: questionName }));
  };
  const onRemove = (item) => {
    dispatch(removeQuestionGroup(item));
  };

  return (
    <div className='mt-3'>
      {questionGroups.map((item) => (
        <div className='card-normal mb-3' key={item.id}>
          <Paragraph
            editable={{
              editing: editMode === item.id,
              onChange: setQuestionName,
              onEnd: () => onEdit(item),
              icon: null,
            }}
          >
            {item.name}
          </Paragraph>
          {editMode === item.id ? (
            <div>
              <Button className='mr-2' onClick={() => toggleEditMode(item.id)}>
                {t('button.cancel', { ns: 'common' })}
              </Button>
              <Button type='primary' onClick={() => onEdit(item)}>
                {t('button.update', { ns: 'common' })}
              </Button>
            </div>
          ) : (
            <div>
              <Tooltip title={t('button.update', { ns: 'common' })}>
                <Button type='text'>
                  <EditOutlined onClick={() => toggleEditMode(item.id)} />
                </Button>
              </Tooltip>
              <Tooltip title={t('button.delete', { ns: 'common' })}>
                <Button type='text' danger>
                  <DeleteOutlined onClick={() => onRemove(item)} />
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListIndex;
