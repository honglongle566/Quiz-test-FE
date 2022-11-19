import { Col } from "antd";
import { useTranslation } from "react-i18next";
import TinyMCE from "shares/common/TinyMCE";
import { useDispatch, useSelector } from "react-redux";
import { setNoteAnswer, bankFormSliceSelector } from "slices/bank/bankForm";

const Explain = () => {
  const { t } = useTranslation("bank");
  const dispatch = useDispatch();
  const {
    item: { note_answer },
  } = useSelector(bankFormSliceSelector);
  const handleChangeExplain = (question) => {
    dispatch(setNoteAnswer(question));
  };

  return (
    <Col span={24} className="question">
      <div className="white-bg p-4">
        <h6>{t("Explain_answers", { ns: "bank" })}</h6>
        <TinyMCE value={note_answer} onChange={handleChangeExplain} />
      </div>
    </Col>
  );
};

export default Explain;
