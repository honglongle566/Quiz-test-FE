import {
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  ScheduleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Button, Collapse, Divider, Tooltip, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { testIndexSelector, removeTest } from 'slices/test/testIndex';
import { useNavigate } from 'react-router-dom';
const { Panel } = Collapse;

const ListIndex = () => {
  const { t } = useTranslation('test', 'common');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector(testIndexSelector);
  const onEditExam = (e, id) => {
    e.stopPropagation();
    navigate(`/tests/${id}/edit`);
  };
  const onCreateExam = (e) => {
    e.stopPropagation();
    navigate(`/test-campaigns`);
  };
  const onDeleteExam = (e, id) => {
    e.stopPropagation();
    dispatch(removeTest(id));
  };

  return (
    <div className='mt-3'>
      {list.map((item) => (
        <Collapse
          expandIconPosition='end'
          expandIcon={() => <CaretRightOutlined rotate={90} />}
          ghost
          className='mb-3 card-medium'
          key={item.id}
        >
          <Panel
            key={1}
            extra={[
              <Tooltip
                key={'edit'}
                title={t('update_test_infomation', { ns: 'test' })}
              >
                <Button type='text'>
                  <EditOutlined onClick={(e) => onEditExam(e, item.id)} />
                </Button>
              </Tooltip>,
              <Tooltip
                key={'delete'}
                title={t('button.delete', { ns: 'common' })}
              >
                <Button type='text' danger>
                  <DeleteOutlined onClick={(e) => onDeleteExam(e, item.id)} />
                </Button>
              </Tooltip>,
            ]}
            header={
              <div>
                <Typography.Title
                  level={4}
                  className='font-weight-light font-size-medium'
                >
                  {item.name}
                </Typography.Title>
                <div className='d-flex'>
                  <div className='text-info-small'>
                    <ScheduleOutlined />
                    <p>{item.time_limit} phút</p>
                  </div>
                  <div className='text-info-small'>
                    <LinkOutlined />
                    <p>{item.examination_rooms.length || 0} đợt thi</p>
                  </div>
                  <div className='text-info-small'>
                    <QuestionCircleOutlined />
                    <p>
                      {(item.question && item.question.length) || 0}{' '}
                      {t('questions', { ns: 'test' })}
                    </p>
                  </div>
                  <div className='text-info-small'>
                    <TrophyOutlined />
                    <p>
                      {item.max_score || 0} {t('score', { ns: 'test' })}
                    </p>
                  </div>
                  <div className='text-info-small'>
                    <FolderOutlined />
                    <p>{item.subject.name || ''}</p>
                  </div>
                </div>
              </div>
            }
          >
            <Divider className='ma-0' />
            <div className='py-3'>
              <Button ghost type='primary' onClick={(e) => onCreateExam(e)}>
                {t('create_test_campaign', { ns: 'test' })}
              </Button>
            </div>
            <Divider className='ma-0' />
            {item.examination_rooms.map((exam_room) => (
              <div className='d-flex justify-content-between align-items-center pt-3 pb-2'>
                <div>
                  <h3>{exam_room.name}</h3>

                  <a
                    href={`info-collect/${exam_room.link_room_exam}`}
                    target='blank'
                  >
                    http://localhost:8080/info-collect/
                    {exam_room.link_room_exam}
                  </a>
                </div>
                <div>
                  <Link to={`/tests/${item.id}/result`}>
                    <Button>{t('button.result', { ns: 'common' })}</Button>
                  </Link>
                </div>
              </div>
            ))}
          </Panel>
        </Collapse>
      ))}
    </div>
  );
};

export default ListIndex;
