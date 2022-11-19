import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col, Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
  appStateSelector,
} from "slices/core/appState";

function HeaderDoTest(props) {
  const { t, i18n } = useTranslation("common");
  const { language } = useSelector(appStateSelector);

  const dispatch = useDispatch();

  const handleClick = (language) => {
    if (language === LANGUAGE_VI) {
      dispatch(changeLocales(LANGUAGE_EN));
      i18n.changeLanguage(LANGUAGE_EN);
    } else {
      dispatch(changeLocales(LANGUAGE_VI));
      i18n.changeLanguage(LANGUAGE_VI);
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="header-do-test">
      <div className="header-do-test__wrapper">
        <Row align="middle" gutter={[16, 16]}>
          <Col>
            <span className="logo logo__md">Quiz Test</span>
          </Col>
          <Col>
            <b>ten dot thi</b>
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 16]}>
          <Col>
            <Button onClick={showModal} type="primary">
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
                  <Button type="primary" onClick={handleOk}>
                    Đã hiểu
                  </Button>
                </Col>
              </Row>
            </Modal>
          </Col>
          <Col>
            <Button type="primary">Thoát</Button>
          </Col>
          <Col>
            <Button
              type="link"
              onClick={() => handleClick(language)}
              className="btn-space-none btn-language"
            >
              {t("header.language")}&nbsp;
              {language === LANGUAGE_VI ? (
                <img
                  className="language"
                  src={require("../../assets/img/US.png")}
                  alt=""
                />
              ) : (
                <img
                  className="language"
                  src={require("../../assets/img/VI.png")}
                  alt=""
                />
              )}
            </Button>
          </Col>
        </Row>
      </div>
      <Row justify="center">
        <Col>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}

export default HeaderDoTest;
