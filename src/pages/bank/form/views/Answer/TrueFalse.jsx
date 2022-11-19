import { Col, Radio, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import TinyMCE from "shares/common/TinyMCE";
import {
  bankFormSliceSelector,
  setCorrectAnswersBoolean,
  setAnswerBoolean,
} from "slices/bank/bankForm";

const TrueFalse = () => {
  const { t } = useTranslation("bank");
  const dispatch = useDispatch();

  const {
    item: { answer_boolean, correct_answers_boolean },
  } = useSelector(bankFormSliceSelector);

  const handleCheckAnswer = (e) => {
    dispatch(setCorrectAnswersBoolean([e.target.value]));
  };

  const handleAnswer = (answer) => {
    dispatch(
      setAnswerBoolean(
        answer_boolean.map((item) => {
          if (item.id === answer.id) return answer;
          return item;
        })
      )
    );
  };

  return (
    <Col span={24} className="true-false">
      <div className="white-bg p-4">
        <h6>{t("Enter_the_answer", { ns: "bank" })}</h6>
        {answer_boolean.map((answer) => (
          <Row
            gutter={16}
            align="middle"
            wrap={false}
            key={answer.id}
            className="mb-3"
          >
            <Col span={1}>
              <Radio
                value={answer.id}
                onChange={handleCheckAnswer}
                checked={correct_answers_boolean.includes(answer.id)}
              />
            </Col>
            <Col span={1}>
              <b>{answer.id.toUpperCase()}</b>
            </Col>
            <Col span={22}>
              <TinyMCE value={answer} onChange={handleAnswer} type="answer" />
            </Col>
          </Row>
        ))}
        <Row className="mt-2">
          (*) {t("Choose_the", { ns: "bank" })}
          <b>{t("correct_answer", { ns: "bank" })}</b>
          {t("by_clicking_on_the_checkbox", { ns: "bank" })}
        </Row>
      </div>
    </Col>
  );
};

export default TrueFalse;
