import { Col } from "antd";
import { useTranslation } from "react-i18next";
import TinyMCE from "shares/common/TinyMCE";
import { useDispatch, useSelector } from "react-redux";
import { setName, bankFormSliceSelector } from "slices/bank/bankForm";

const Question = () => {
  const { t } = useTranslation("bank");
  const dispatch = useDispatch();
  const {
    item: { name },
  } = useSelector(bankFormSliceSelector);
  const handleChangeQuestion = (question) => {
    dispatch(setName(question));
  };

  return (
    <Col span={24} className="question">
      <div className="white-bg p-4">
        <h6>{t("Enter_the_question", { ns: "bank" })}</h6>
        <TinyMCE value={name} onChange={handleChangeQuestion} />
      </div>
    </Col>
  );
};

export default Question;
