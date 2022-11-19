import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row, Space } from "antd";
import TinyMCE from "shares/common/TinyMCE";
import { useTranslation } from "react-i18next";
import { getLetter } from "utils/question";
import { useDispatch, useSelector } from "react-redux";
import {
  setMatchingAnswers,
  setMatchingCorrectAnswers,
  bankFormSliceSelector,
} from "slices/bank/bankForm";

const Matching = () => {
  const { t } = useTranslation("bank");
  const dispatch = useDispatch();
  const {
    item: { matching_answers, matching_correct_answers },
  } = useSelector(bankFormSliceSelector);

  const handleAddQuestion = () => {
    dispatch(
      setMatchingAnswers({
        ...matching_answers,
        questions: [
          ...matching_answers.questions,
          { id: matching_answers.questions.length + 1, content: "" },
        ],
      })
    );
    addCorRow();
  };
  const handleAddAnswer = () => {
    dispatch(
      setMatchingAnswers({
        ...matching_answers,
        answers: [
          ...matching_answers.answers,
          { id: getLetter(matching_answers.answers.length), content: "" },
        ],
      })
    );
  };
  const handleDeleteQuestion = (question) => {
    let count = 0;
    let deleteQuestion = [];
    for (let item of matching_answers.questions) {
      if (item.id !== question.id) {
        count++;
        deleteQuestion.push({ ...item, id: count });
      }
    }
    dispatch(
      setMatchingAnswers({
        ...matching_answers,
        questions: deleteQuestion,
      })
    );
    deleteCorRow(question);
  };
  const addCorRow = () => {
    dispatch(
      setMatchingCorrectAnswers({
        ...matching_correct_answers,
        [matching_answers.questions.length + 1]: [],
      })
    );
  };
  const deleteCorRow = (question) => {
    if (matching_correct_answers.hasOwnProperty(question.id)) {
      let newCorAnswer = { ...matching_correct_answers };
      let corAnswer = Object.values(matching_correct_answers);
      for (let i in matching_correct_answers) {
        if (Number(i) >= Number(question.id) && Number(i) < corAnswer.length) {
          newCorAnswer[i] = newCorAnswer[Number(i) + 1];
        }
      }
      delete newCorAnswer[corAnswer.length];
      dispatch(setMatchingCorrectAnswers(newCorAnswer));
    }
  };
  const handleDeleteAnswer = (answer) => {
    let count = 0;
    let deleteAnswers = [];
    for (let item of matching_answers.answers) {
      if (item.id !== answer.id) {
        deleteAnswers.push({ ...item, id: getLetter(count) });
        count++;
      }
    }
    deleteCorCol(answer);
    dispatch(
      setMatchingAnswers({
        ...matching_answers,
        answers: deleteAnswers,
      })
    );
  };
  const deleteCorCol = (answer) => {
    let newCorAnswer = { ...matching_correct_answers };
    let answerToNumber = answer.id.charCodeAt(0);
    for (let i in matching_correct_answers) {
      let newAnswers = [];
      for (let k of newCorAnswer[i]) {
        let itemToNumber = k.charCodeAt(0);
        if (itemToNumber === answerToNumber) continue;
        if (itemToNumber > answerToNumber)
          newAnswers.push(String.fromCharCode(itemToNumber - 1));
        else newAnswers.push(k);
      }
      newCorAnswer[i] = newAnswers;
    }
    dispatch(setMatchingCorrectAnswers(newCorAnswer));
  };
  const handleCheckAnswer = (e, answer, question) => {
    if (e.target.checked) {
      dispatch(
        setMatchingCorrectAnswers({
          ...matching_correct_answers,
          [question.id]: [...matching_correct_answers[question.id], answer.id],
        })
      );
    } else {
      dispatch(
        setMatchingCorrectAnswers({
          ...matching_correct_answers,
          [question.id]: matching_correct_answers[question.id].filter(
            (item) => item !== answer.id
          ),
        })
      );
    }
  };
  const handleChangeAnswer = (answer) => {
    dispatch(
      setMatchingAnswers({
        ...matching_answers,
        answers: matching_answers.answers.map((item) => {
          if (item.id === answer.id) {
            return answer;
          }
          return item;
        }),
      })
    );
  };
  const handleChangeQuestion = (question) => {
    dispatch(
      setMatchingAnswers({
        ...matching_answers,
        questions: matching_answers.questions.map((item) => {
          if (item.id === question.id) {
            return question;
          }
          return item;
        }),
      })
    );
  };
  return (
    <Col span={24}>
      <div className="white-bg p-4">
        <h6>{t("Enter_the_answer", { ns: "bank" })}</h6>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row justify="space-around">
              <Col>
                <b>{t("Column", { ns: "bank" })} 1</b>
              </Col>
              <Col>
                <b>{t("Column", { ns: "bank" })} 2</b>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            {matching_answers.questions.map((question) => (
              <Row
                align="middle"
                wrap={false}
                className="mb-3"
                key={question.id}
              >
                <Col span={1} className="mr-2">
                  <b>{question.id}</b>
                </Col>
                <Col span={20}>
                  <TinyMCE
                    value={question}
                    onChange={handleChangeQuestion}
                    type="answer"
                  />
                </Col>
                <Col span={1}>
                  <Button
                    type="text"
                    onClick={() => handleDeleteQuestion(question)}
                  >
                    <CloseCircleOutlined />
                  </Button>
                </Col>
              </Row>
            ))}
            <Button onClick={handleAddQuestion} className="ml-4">
              <PlusOutlined /> {t("Add_answer", { ns: "bank" })}
            </Button>
          </Col>
          <Col span={12}>
            {matching_answers.answers.map((answer) => (
              <Row align="middle" wrap={false} className="mb-3" key={answer.id}>
                <Col span={1} className="mr-2">
                  <b>{answer.id.toUpperCase()}</b>
                </Col>
                <Col span={20}>
                  <TinyMCE
                    value={answer}
                    onChange={handleChangeAnswer}
                    type="answer"
                  />
                </Col>
                <Col span={1}>
                  <Button
                    type="text"
                    onClick={() => handleDeleteAnswer(answer)}
                  >
                    <CloseCircleOutlined />
                  </Button>
                </Col>
              </Row>
            ))}
            <Button onClick={handleAddAnswer} className="ml-4">
              <PlusOutlined /> {t("Add_answer", { ns: "bank" })}
            </Button>
          </Col>
          <Col span={24}>
            <h6>{t("Choose_the_answer", { ns: "bank" })}</h6>
            <p>{t("Please_choose", { ns: "bank" })}</p>
          </Col>
          <Col span={24}>
            <Row justify="center">
              <Col>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      {matching_answers.answers.map((answer) => (
                        <th className="pa-2" key={answer.id}>
                          {answer.id.toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matching_answers.questions.map((question) => (
                      <tr key={question.id}>
                        <td className="pa-2">{question.id}</td>
                        {matching_answers.answers.map((answer) => (
                          <td className="pa-2" key={answer.id}>
                            <Checkbox
                              checked={matching_correct_answers[
                                question.id
                              ].includes(answer.id)}
                              onChange={(e) =>
                                handleCheckAnswer(e, answer, question)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default Matching;
