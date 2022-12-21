import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';

const FillingBlankSpace = ({ data, answers }) => {
  const changeContent = () => {
    let newContent = data?.name;
    for (let item of data?.fill_blank_correct_answer) {
      newContent = newContent.replace(
        `[%${item.key}%]`,
        `<strong>__${item.key}__</strong>`,
      );
    }
    return newContent;
  };

  const showIconResult = (correct, examinee) => {
    if (correct == examinee) {
      return <CheckCircleFilled className='text-green ml-1' />;
    }

    return <CloseCircleFilled className='text-red ml-1' />;
  };

  return (
    <div>
      <span className='question_order'>CÂU HỎI {data.index}</span>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            className='mb-3'
            dangerouslySetInnerHTML={{ __html: changeContent(data.name) }}
          ></div>
          <div>
            <strong className='mb-3'>Trả lời</strong>
            <div>
              {data?.fill_blank_correct_answer.map((item) => (
                <div className='d-flex align-items-center mb-1' key={item.key}>
                  <div className='mr-2'>
                    <b>{item.key}</b>
                  </div>
                  <div className='mr-2'>
                    <input
                      type='text'
                      className='fill_input'
                      id={item.key}
                      defaultValue={
                        answers.find((x) => x.key == item.key)?.content
                      }
                      readOnly='readonly'
                    />
                    {showIconResult(item.content, answers[item.key])}
                  </div>
                  <div>
                    <b> Đáp án:</b> <span>{item.content}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
      {data.note_answer && (
        <Col className='mt-3'>
          <div>
            <strong>Giải thích đáp án</strong>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.note_answer }}></div>
        </Col>
      )}
    </div>
  );
};

export default FillingBlankSpace;
