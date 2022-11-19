import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import TinyMCE from "shares/common/TinyMCE";
import {
  bankFormSliceSelector,
  setFillBlankCorrectAnswers,
  setName,
} from "slices/bank/bankForm";

const QuestionFillingSpaces = () => {
  const { t } = useTranslation("bank");
  const dispatch = useDispatch();
  const {
    item: { name, fill_blank_correct_answers },
  } = useSelector(bankFormSliceSelector);

  const [isAnswer, setIsAnswer] = useState(false);
  const handleChangeAnswers = (e, key) => {
    dispatch(
      setFillBlankCorrectAnswers(
        fill_blank_correct_answers.map((answer) => {
          if (answer.key === Number(key)) {
            return { ...answer, content: [e.target.value] };
          }
          return answer;
        })
      )
    );
  };

  const formatQuestion = (question) => {
    let newQuestion = question;
    for (let item of fill_blank_correct_answers) {
      newQuestion = newQuestion.replace(
        `[%${item.key}%]`,
        `<strong>__${item.key}__</strong>`
      );
    }
    return newQuestion;
  };

  const checkDuplicateAnswers = (arr) => {
    return new Set(arr).size !== arr.length;
  };

  const handleSaveQuestion = () => {
    if (name) {
      const pattern = /\[%[0-9]+%\]/;
      const found = name.match(/\[%[0-9]+%\]/g);
      if (pattern.test(name) && !checkDuplicateAnswers(found)) {
        setIsAnswer(true);
        let keysToNumber = name
          .match(/\[%[0-9]+%\]/g)
          .map((item) => Number(item.slice(2, item.length - 2)));

        dispatch(
          setFillBlankCorrectAnswers(
            keysToNumber.map((item) => {
              if (!fill_blank_correct_answers.length)
                return { key: item, content: [] };
              let oldAnswer = fill_blank_correct_answers.find(
                (x) => x.key === item
              );
              if (oldAnswer) return oldAnswer;
              return { key: item, content: [] };
            })
          )
        );
      } else {
        Modal.info({
          title: t("Notification", { ns: "bank" }),
          icon: <ExclamationCircleOutlined />,
          content: t("Please_enter_a_question", { ns: "bank" }),
          okText: t("yes", { ns: "testCampaign" }),
          onOk() {},
          maskClosable: true,
        });
      }
    }
  };
  const handleOnchangeQuestion = (question) => {
    dispatch(setName(question));
  };

  return (
    <>
      <Col span={24}>
        <div className="white-bg p-4 ">
          <Row gutter={[8, 8]}>
            <Col flex={1}>
              <h6>{t("Enter_the_question", { ns: "bank" })}</h6>
            </Col>
            {isAnswer && (
              <Col>
                <Tooltip title={t("Edit", { ns: "bank" })}>
                  <EditOutlined onClick={() => setIsAnswer(false)} />
                </Tooltip>
              </Col>
            )}
            <Col span={24} className="question">
              <Row wrap={false} gutter={[8, 8]} justify="space-between">
                {isAnswer && (
                  <div
                    dangerouslySetInnerHTML={{ __html: formatQuestion(name) }}
                  ></div>
                )}
                {!isAnswer && (
                  <Col span={24}>
                    <TinyMCE value={name} onChange={handleOnchangeQuestion} />
                    <Col span={24}>
                      <div className="white-bg p-4 footer_question_type">
                        <p className="mb-3">
                          {t("To_make_space", { ns: "bank" })}
                        </p>
                        <p>Công cha như núi thái [%1%]</p>
                        <p>[%2%] như nước trong nguồn chảy ra</p>
                      </div>
                    </Col>
                    <Button type="primary" onClick={handleSaveQuestion}>
                      {t("Save_question", { ns: "bank" })}
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
      {isAnswer && (
        <Col span={24}>
          <div className="white-bg p-4 ">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h6>{t("Enter_essay_question_info", { ns: "bank" })}</h6>
              </Col>
              <Col span={24}>
                <p className="text_mute">
                  - {t("The_system_does_not_distinguish", { ns: "bank" })}
                </p>
                <p className="text_mute">
                  -{" "}
                  {t("To_record_more_than_one_correct_answer", { ns: "bank" })}
                </p>
              </Col>
              <Col span={24}>
                {fill_blank_correct_answers.map((item) => (
                  <Row key={item.key} align="middle" className="mb-3">
                    <Col span={2}>
                      <b>{item.key}:</b>
                    </Col>
                    <Col span={22}>
                      <Input
                        value={item.content}
                        onChange={(e) => handleChangeAnswers(e, item.key)}
                      />
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </div>
        </Col>
      )}
    </>
  );
};

export default QuestionFillingSpaces;
