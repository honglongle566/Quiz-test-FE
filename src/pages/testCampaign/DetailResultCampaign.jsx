import {
  CheckOutlined,
  CloseCircleOutlined,
  ExclamationCircleFilled,
  FieldTimeOutlined,
  FormOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  PlayCircleOutlined,
  QrcodeOutlined,
  RocketOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Steps,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ModalShareResult from "../../components/container/TestCampaigns/DetailResultCampaign/ModalShareResult";

import Essay from "../../components/container/Result/Question/Essay";
import FillingBlankSpace from "../../components/container/Result/Question/FillingBlankSpace";
import Matching from "../../components/container/Result/Question/Matching";
import MultipleChoice from "../../components/container/Result/Question/MultipleChoice";
import TrueFalse from "../../components/container/Result/Question/TrueFalse";

const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

const sights = {
  Beijing: ["Tiananmen", "Great Wall"],
  Shanghai: ["Oriental Pearl", "The Bund"],
};

function DetailResultCampaign() {
  const { t } = useTranslation("statistic");

  const [isShowOnlyEssay, setIsShowOnlyEssay] = useState(false);

  const showQuestion = (question, answers) => {
    if (question.type === 1)
      return <MultipleChoice data={question} answers={answers} />;
    if (question.type === 2)
      return <TrueFalse data={question} answers={answers} />;
    if (question.type === 3) return <Essay data={question} answers={answers} />;
    if (question.type === 8)
      return <Matching data={question} answers={answers} />;
    if (question.type === 9)
      return <FillingBlankSpace data={question} answers={answers} />;
  };

  return (
    <div className="results_statistic container">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/test-campaigns">
                <span>{t("test_campaign_br", { ns: "statistic" })}</span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/test-campaigns/:id/result">
                <span>
                  {t("the_test_campaign_result", { ns: "statistic" })}
                </span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Ho va ten</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="white-bg p-4">
                <h6> Ho va ten</h6>
                <p>
                  <QrcodeOutlined /> ma dinh danh
                </p>
                <p>
                  <PhoneOutlined /> phone
                </p>
                <p>
                  <MailOutlined /> mail
                </p>
                <p>
                  <TeamOutlined /> group
                </p>
                <p>
                  <RocketOutlined /> vi tri
                </p>
                <p>
                  <IdcardOutlined /> 113.23.55.30
                </p>
                <Divider />
                <Row gutter={[8, 8]} className="result_test">
                  <Col flex={1}>
                    <div className="point">
                      <span>2.5</span> /3 {t("point", { ns: "statistic" })}
                    </div>
                  </Col>
                  <Col>
                    <div className="pass_box pass">
                      {" "}
                      <CheckOutlined /> {t("passed", { ns: "statistic" })}
                    </div>
                    <div className="pass_box un_pass">
                      {" "}
                      <ExclamationCircleFilled />{" "}
                      {t("failed", { ns: "statistic" })}
                    </div>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col span={14}>
                        <p>
                          {" "}
                          {t("completion_percentage", {
                            ns: "statistic",
                          })}
                          : <span>50.5%</span>{" "}
                        </p>
                      </Col>
                      <Col span={10}>
                        <Progress percent={50} showInfo={false} />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col flex={1}>
                        {t("total_correct_questions", { ns: "statistic" })}
                      </Col>
                      <Col>
                        <span>1/2</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row>
                      <Col flex={1}>{t("duration", { ns: "statistic" })}</Col>
                      <Col>
                        <span>00:00:14</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <ModalShareResult />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <div className="white-bg p-4">
            <Row>
              <Col span={24} className="box-head-result">
                <h6>{t("test_detail", { ns: "statistic" })}</h6>
                <Button
                  type="primary"
                  onClick={() => setIsShowOnlyEssay(!isShowOnlyEssay)}
                >
                  {isShowOnlyEssay ? "Show All Question" : "Show Only Essay"}
                </Button>
              </Col>
              <Col span={24}>
                <div className="box-alert mb-1">
                  <p>1 non-scored essay answer</p>
                </div>
              </Col>
              {isShowOnlyEssay ? (
                <Col span={24}>
                  {data.questions
                    .filter((q) => q.type === 3)
                    .map((question) => (
                      <div key={question.id}>
                        {showQuestion(question, data.answers[question.index])}
                        <div>
                          <div className="mt-1">
                            <h3>Comment</h3>
                            <TextArea rows={4} />
                          </div>
                          <div className="mt-1 flex-save-score">
                            <div>
                              <div
                                className="flex-save-score"
                                style={{ width: "90px" }}
                              >
                                <h3>Score</h3>
                                <span style={{ fontSize: "12px" }}>Max 10</span>
                              </div>
                              <InputNumber
                                min={0}
                                defaultValue={0}
                                // max={1}
                                // onChange={onChange}
                              />
                            </div>
                            <Button type="primary">Save</Button>
                          </div>
                        </div>

                        <Divider />
                      </div>
                    ))}
                </Col>
              ) : (
                <Col span={24}>
                  {data.questions.map((question) => (
                    <div key={question.id}>
                      {showQuestion(question, data.answers[question.index])}
                      <Divider />
                    </div>
                  ))}
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const data = {
  questions: [
    {
      note_answer: null,
      index: 2,
      id: 240345,
      content: "<p>asa</p>",
      type: 1,
      time_limit: null,
      score: 1,
      answers: [
        { id: "b", content: "<p>2</p>" },
        { id: "d", content: "<p>4</p>" },
        { id: "c", content: "<p>3</p>" },
        { id: "a", content: "<p>1</p>" },
        { id: "e", content: "<p>5</p>" },
      ],
      has_mul_correct_answers: true,
      scoring_type: 0,
      correct_answers: ["b", "c"],
    },
    {
      note_answer: "<p>d</p>",
      index: 4,
      id: 240298,
      content: "<p>nhiueu dap ans 2</p>",
      type: 1,
      time_limit: 3600,
      score: 1,
      answers: [
        { id: "a", content: "<p>1</p>" },
        { id: "b", content: "<p>2</p>" },
      ],
      has_mul_correct_answers: true,
      scoring_type: 1,
      correct_answers: ["a", "b"],
      start_at: "2022-07-05 10:15:39",
    },
    {
      note_answer: "<p>dsadsa</p>",
      index: 6,
      id: 240286,
      content: "<p>1</p>",
      type: 1,
      time_limit: null,
      score: 1,
      answers: [
        { id: "a", content: "<p>1</p>" },
        { id: "c", content: "<p>3</p>" },
        { id: "d", content: "<p>4</p>" },
        { id: "b", content: "<p>2</p>" },
      ],
      has_mul_correct_answers: false,
      scoring_type: 0,
      correct_answers: ["a"],
    },
    {
      note_answer: null,
      index: 5,
      id: 240291,
      content: "<p>xsa</p>",
      type: 3,
      time_limit: null,
      score: 1,
      answers: [],
      has_mul_correct_answers: false,
      scoring_type: 0,
      correct_answers: null,
      note: "xsacs",
      is_file_required: 0,
    },
    {
      note_answer: "<p>cass</p>",
      index: 1,
      id: 240358,
      content:
        '<figure class="table"><table><tbody><tr><td>xs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>xs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>cs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>cs</td><td>cs</td><td>cs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>cs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>',
      type: 1,
      time_limit: null,
      score: 1,
      answers: [
        { id: "a", content: "<p>s</p>" },
        { id: "b", content: "<p>c</p>" },
        { id: "d", content: "<p>c</p>" },
        { id: "c", content: "<p>s</p>" },
      ],
      has_mul_correct_answers: false,
      scoring_type: 0,
      correct_answers: ["b"],
    },
    {
      note_answer: "<p>dwed</p>",
      index: 3,
      id: 240300,
      content: "<p>xsa</p>",
      type: 8,
      time_limit: null,
      score: 1,
      answers: [],
      has_mul_correct_answers: false,
      scoring_type: 1,
      correct_answers: null,
      matching_answers: {
        questions: [
          { id: 1, content: "<p>1</p>" },
          { id: 2, content: "<p>2</p>" },
          { id: 3, content: "<p>3</p>" },
        ],
        answers: [
          { id: "a", content: "<p>2</p>" },
          { id: "b", content: "<p>4</p>" },
        ],
      },
      matching_correct_answers: { 1: ["a"], 2: ["a", "b"], 3: ["b"] },
      matching_answer_type: 1,
    },
    {
      note_answer: "<p>hiae</p>",
      index: 7,
      id: 240278,
      content:
        '<p><span style="background-color:rgb(44,75,159);color:rgb(255,255,255);">Filling blank spaces</span><span style="background-color:hsl(204,8%,98%);color:hsl(0,0%,0%);"> &nbsp;test</span></p><div class="mt-2" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(33, 37, 41);font-family:mainfont, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-top:0.5rem !important;orphans:2;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><p>C\u00f4ng cha nh\u01b0 n\u00fai th\u00e1i [%1%]</p></div><div class="mt-1" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(33, 37, 41);font-family:mainfont, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-top:0.25rem !important;orphans:2;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><p>[%2%] nh\u01b0 n\u01b0\u1edbc trong ngu\u1ed3n ch\u1ea3y ra</p></div>',
      type: 9,
      time_limit: null,
      score: 1,
      answers: [],
      has_mul_correct_answers: false,
      scoring_type: 1,
      correct_answers: null,
      fill_blank_correct_answers: [
        { key: 1, content: ["s\u01a1n"] },
        { key: 2, content: ["ngu\u1ed3n"] },
      ],
    },
  ],
  answers: {
    1: ["b"],
    2: ["c", "d", "b"],
    3: { 1: ["a"], 2: ["b", "a"], 3: [] },
    4: ["b"],
    5: {
      answer: "vfdgcbsd   c\u00fadgcuds",
      file: null,
      score: null,
      comment: null,
    },
    6: ["b"],
    7: ["s\u01a1n", "Ngh\u0129a m\u1eb9"],
    8: ["b"],
    9: ["s\u01a1n", "Ngh\u0129a m\u1eb9"],
  },
  start_at: "2022-07-05T03:15:22.000000Z",
  end_at: "2022-07-05T03:16:15.000000Z",
  score: 1.5,
  max_score: 7,
  complete_percent: 21.43,
  created_at: "2022-07-05T03:15:19.000000Z",
  updated_at: "2022-07-05T03:16:15.000000Z",
  test_id: 30317,
  examiner_id: 11764,
  need_grade: 1,
  type: 1,
  result: null,
  is_passed: null,
  is_send_result: 0,
  result_send_at: null,
  identify_code: null,
  group: null,
  toeic_reading_score: null,
  toeic_listening_score: null,
  position: null,
  is_graded_it: 0,
  is_exist_it_questions: 0,
  action_logs:
    '{"questions":[{"index":1,"time":"2022-07-05 10:15:24:742","type":"start-question"},{"index":2,"time":"2022-07-05 10:15:27:997","type":"start-question"},{"index":3,"time":"2022-07-05 10:15:32:661","type":"start-question"},{"index":4,"time":"2022-07-05 10:15:41:069","type":"start-question"},{"index":5,"time":"2022-07-05 10:15:46:017","type":"start-question"},{"index":6,"time":"2022-07-05 10:15:52:245","type":"start-question"},{"index":7,"time":"2022-07-05 10:16:03:169","type":"start-question"}],"userActions":[{"type":"start-test","time":"2022-07-05 10:15:22:601"},{"type":"finish-test","time":"2022-07-05 10:16:15:262"}]}',
  ip: "222.252.30.146",
};

export default DetailResultCampaign;
