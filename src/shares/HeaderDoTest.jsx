import { Button, Col, Modal, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { doTestSelector } from 'slices/doTest/doTest';

const HeaderDoTest = () => {
  const { t, i18n } = useTranslation('common');
  const { examRoom } = useSelector(doTestSelector);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='layout-result'>
      <div className='layout-result__header'>
        <Row align='middle' gutter={[16, 16]}>
          <Col>
            <span className='logo logo__md'>Quiz Test</span>
          </Col>
          <Col>
            <b>{examRoom.name}</b>
          </Col>
        </Row>
        <Row align='middle' gutter={[16, 16]}>
          <Col>
            <Button onClick={showModal} type='primary'>
              Hướng dẫn
            </Button>
            <Modal
              visible={isModalVisible}
              maskClosable={true}
              onOk={handleOk}
              footer={null}
              closable={false}
            >
              <Row gutter={[16, 16]}>
                <Col span={10} offset={8}>
                  <h4>Hướng dẫn</h4>
                </Col>
                <Col span={20} offset={2}>
                  <b>1. Thời gian làm bài</b>
                  <p>- Không giới hạn thời gian làm bài</p>
                </Col>

                <Col span={20} offset={2}>
                  <b>2. Nội quy</b>
                  <p>- Không nhờ người khác thi hộ.</p>
                  <p>- Không sao chép câu trả lời từ tài liệu trên internet.</p>
                </Col>

                <Col span={20} offset={2}>
                  <b>3. Làm lại bài thi</b>
                  <p>- Bài thi này có thể làm lại</p>
                </Col>
                <Col span={10} offset={10}>
                  <Button type='primary' onClick={handleOk}>
                    Đã hiểu
                  </Button>
                </Col>
              </Row>
            </Modal>
          </Col>
          <Col>
            <Button type='primary'>Thoát</Button>
          </Col>
        </Row>
      </div>
      <div style={{ height: '50px', with: '100%' }}></div>
      <Row justify='center' className='layer-box-test'>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default HeaderDoTest;
