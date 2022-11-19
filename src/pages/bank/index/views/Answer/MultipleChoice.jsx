import { CheckCircleOutlined } from "@ant-design/icons";

const MultipleChoice = () => {
  return (
    <div>
      <h3>Đáp án</h3>
      <p>
        <CheckCircleOutlined />
        {"A)"}
        {"1"}
      </p>
      <p>
        <CheckCircleOutlined />
        {"B)"}
        {"2"}
      </p>
      <p>
        <CheckCircleOutlined />
        {"C)"}
        {"3"}
      </p>
      <p>
        <CheckCircleOutlined />
        {"D)"}
        {"4"}
      </p>
    </div>
  );
};

export default MultipleChoice;
