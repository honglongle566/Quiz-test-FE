import React from "react";

const QuestionInfo = () => {
  return (
    <div>
      <h3>Thông tin câu hỏi</h3>
      <div>
        <div className="info">Kiểu câu hỏi</div>
        <div className="info">Đúng/Sai</div>
      </div>
      <div>
        <div className="info">Điểm</div>
        <div className="info">1</div>
      </div>

      <div>
        <div className="info">Ngày tạo</div>
        <div className="info">21/05/2022 14:34:05</div>
      </div>
      <div>
        <div className="info">Thời gian làm bài</div>
        <div className="info">Không giới hạn</div>
      </div>
    </div>
  );
};

export default QuestionInfo;
