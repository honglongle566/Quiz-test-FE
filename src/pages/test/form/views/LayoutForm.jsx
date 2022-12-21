import {
  ClockCircleOutlined,
  DownOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  ForkOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SettingFilled,
  TrophyOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Dropdown,
  Menu,
  Row,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { showDialog, testFormSelector } from 'slices/test/testForm';
import ConfirmDialog from './ConfirmDialog';
import FormInfo from './FormInfo';

const LayoutForm = () => {
  const { t } = useTranslation('test');
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddQuestion = () => {
    navigate(`/bank/create-question?test_id=${param?.id}`);
  };
  const { test } = useSelector(testFormSelector);
  return (
    <div className='container'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/tests'>Đề Thi</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{test.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <Row align='middle' justify='space-between'>
            <Col>
              <Typography.Title level={3}>{test.name}</Typography.Title>
            </Col>
            <Col>
              <Button
                type='primary'
                size='large'
                onClick={() => dispatch(showDialog())}
              >
                <SettingFilled />
                {t('test_setting', { ns: 'test' })}
              </Button>
            </Col>
          </Row>
          <Divider className='ma-0 pa-0 mt-4' />
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} align='middle' justify='space-between'>
            <Col span={14}>
              <Row gutter={16}>
                <Col>
                  <QuestionCircleOutlined style={{ marginRight: 4 }} />
                  <span>
                    {(test.question && test.question.length) || 0}{' '}
                    {t('question', { ns: 'test' })}
                  </span>
                </Col>
                <Col>
                  <TrophyOutlined style={{ marginRight: 4 }} />
                  {test.max_score} <span>{t('point', { ns: 'test' })}</span>
                </Col>
                <Col>
                  <ClockCircleOutlined style={{ marginRight: 4 }} />
                  {test.time_limit}{' '}
                  <span>{`${t('no_time_limit', { ns: 'test' })}`}</span>
                </Col>
                <Col>
                  <FileTextOutlined style={{ marginRight: 4 }} />
                  <span>
                    {t('show_all_questions_per_page', { ns: 'test' })}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col>
              <Dropdown.Button
                onClick={handleAddQuestion}
                overlay={
                  <Menu
                    items={[
                      {
                        key: '1',
                        label: (
                          <Link
                            to={`/bank/create-question?test_id=${param?.id}`}
                          >
                            {t('add_new_question', { ns: 'test' })}
                          </Link>
                        ),
                      },
                      {
                        key: '2',
                        label: (
                          <Link to={`/bank?test_id=${param?.id}`}>
                            {t('my_question_bank', { ns: 'test' })}
                          </Link>
                        ),
                      },
                    ]}
                  />
                }
                icon={<DownOutlined />}
                type='primary'
                size='large'
              >
                <PlusCircleOutlined />
                <Typography.Text style={{ color: '#fff' }}>
                  {t('add_question', { ns: 'test' })}
                </Typography.Text>
              </Dropdown.Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <FormInfo />
      <ConfirmDialog />
    </div>
  );
};

export default LayoutForm;
