import { Row, Col, Skeleton, Button, Divider, Statistic, Anchor } from "antd";
import React from "react";
import {
  BackwardOutlined,
  ForwardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Questions from "../../components/container/DoTest/Questions";

function ExamQuestions(props) {
  const onFinish = () => {
    console.log("finished!");
  };

  return (
    <div className="exam_question container">
      <Row gutter={[36, 0]}>
        <Col span={16} className="mb-5">
          <Row gutter={[16, 16]} justify="center">
            <Questions data={data} />
            <Col span={24} className="mt-2">
              <Row>
                <Col flex={1}>
                  <Button>
                    <BackwardOutlined /> Câu hỏi trước
                  </Button>
                </Col>
                <Col>
                  <Button>
                    Câu hỏi tiếp theo <ForwardOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button type="primary">Nộp bài thi</Button>
            </Col>
          </Row>
        </Col>
        <Col
          span={8}
          className="exam exam__border exam_question__category exam_question__category--role"
        >
          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <Row justify="center" gutter={[24, 24]}>
                <h3>Thời gian làm bài kiểm tra còn lại</h3>

                <Statistic.Countdown
                  value={Date.now() + 60 * 1000}
                  onFinish={onFinish}
                />

                <small>
                  Khi hết thời gian làm bài, kết quả sẽ chỉ được tính ở các câu
                  bạn đã chọn đáp án.
                </small>
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }} />
                <Col>
                  <h3>Danh sách câu hỏi</h3>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                {data &&
                  data.map((question, index) => (
                    <Col span={24} key={question.id}>
                      <Row>
                        <Col span={22}>
                          <p className="text-bold text_mute">
                            Cau {index + 1}:
                          </p>
                        </Col>
                        <Col span={2}>
                          <CheckCircleOutlined />
                        </Col>
                      </Row>
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

const data = [
  {
    id: 240286,
    index: 1,
    content: "<p>1</p>",
    type: 1,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    has_mul_correct_answers: false,
    answers: [
      { id: "d", content: "<p>4</p>" },
      { id: "b", content: "<p>2</p>" },
      { id: "c", content: "<p>3</p>" },
      { id: "a", content: "<p>1</p>" },
    ],
    examinee_answers: [],
    section_id: null,
  },
  {
    id: 240344,
    index: 1,
    content:
      "This question has a time limit to answer is 01:00:00, click start to view and answer the question",
    type: 1,
    old_time_limit: 3600,
    time_limit: 3600,
    start_at: null,
    has_mul_correct_answers: true,
    answers: [
      { id: "b", content: "<p>2</p>" },
      { id: "a", content: "<p>1</p>" },
      { id: "d", content: "<p>4</p>" },
      { id: "e", content: "<p>5</p>" },
      { id: "c", content: "<p>3</p>" },
    ],
    examinee_answers: [],
    section_id: null,
  },
  {
    id: 240278,
    index: 3,
    content:
      '<p><span style="background-color:rgb(44,75,159);color:rgb(255,255,255);">Filling blank spaces</span><span style="background-color:hsl(204,8%,98%);color:hsl(0,0%,0%);"> &nbsp;test</span></p><div class="mt-2" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(33, 37, 41);font-family:mainfont, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-top:0.5rem !important;orphans:2;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><p>C\u00f4ng cha nh\u01b0 n\u00fai th\u00e1i [%1%]</p></div><div class="mt-1" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(33, 37, 41);font-family:mainfont, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-top:0.25rem !important;orphans:2;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><p>[%2%] nh\u01b0 n\u01b0\u1edbc trong ngu\u1ed3n ch\u1ea3y ra</p></div>',
    type: 5,
    old_time_limit: 0,
    time_limit: 10,
    start_at: null,
    fill_blank_correct_answers: [{ key: 1 }, { key: 2 }],
    scoring_type: 1,
    section_id: null,
  },
  {
    id: 240289,
    index: 5,
    content: "<p>dd</p>",
    type: 2,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    has_mul_correct_answers: false,
    answers: [
      { id: "a", content: "\u0110\u00fang" },
      { id: "b", content: "Sai" },
    ],
    examinee_answers: [],
    section_id: null,
  },
  {
    id: 240290,
    index: 6,
    content:
      '<p>test <span style="background-color:rgb(44,75,159);color:rgb(255,255,255);">Matching</span></p>',
    type: 3,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    answer: [],
    matching_answers: {
      questions: [
        { id: 1, content: "<p>1</p>" },
        { id: 2, content: "<p>2</p>" },
        { id: 3, content: "<p>3</p>" },
      ],
      answers: [
        { id: "a", content: "<p>2</p>" },
        { id: "b", content: "<p>1</p>" },
        { id: "c", content: "<p>3</p>" },
      ],
    },
    matching_answer_type: 1,
    scoring_type: 1,
    section_id: null,
  },
  {
    id: 240291,
    index: 7,
    content: "<p>xsa</p>",
    type: 4,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    examinee_answers: [],
    is_file_required: false,
    section_id: null,
  },
  {
    id: 240345,
    index: 9,
    content: "<p>asa</p>",
    type: 1,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    has_mul_correct_answers: true,
    answers: [
      { id: "a", content: "<p>1</p>" },
      { id: "c", content: "<p>3</p>" },
      { id: "e", content: "<p>5</p>" },
      { id: "b", content: "<p>2</p>" },
      { id: "d", content: "<p>4</p>" },
    ],
    examinee_answers: [],
    section_id: null,
  },
];

export default ExamQuestions;
