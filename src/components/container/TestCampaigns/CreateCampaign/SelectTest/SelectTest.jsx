import { CalendarOutlined, FolderOutlined } from "@ant-design/icons";
import { Col, Input, Radio, Row, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
const { Search } = Input;

function SelectTest(props) {
  const { t } = useTranslation("testCampaign");

  const onSearch = (value) => {
    //console.log(value);
  };

  function handleChange(value) {
    //console.log(`selected ${value}`);
  }

  const [value, setValue] = React.useState();

  const onChangeRadio = (e) => {
    // //console.log('radio checked', e.target.value);
    setValue(e.target.value);
    e.target.value > 0
      ? props.setCheckSelectTest(true)
      : props.setCheckSelectTest(false);
  };

  const onClickBtnContinue = () => {
    if (props.checkSelectTest) {
      props.setCurrent(1);
    } else {
      props.modalError();
    }
  };

  return (
    <>
      <div className="p-4 select_test white-bg">
        <Row gutter={[8, 8]}>
          <Col flex={1}>
            <h6 className="font_weight_bold">
              {t("Choose_a_test", { ns: "testCampaign" })}{" "}
            </h6>
          </Col>
          <Col>
            <Search
              className="search-btn"
              size="large"
              placeholder={t("Search_the_test", { ns: "testCampaign" })}
              onSearch={onSearch}
            />
          </Col>
          <Col>
            <Select
              defaultValue={1}
              className="select"
              onChange={handleChange}
              size="large"
              style={{ width: 150 }}
            >
              <Select.Option value={1}>
                {t("All_tests", { ns: "testCampaign" })}
              </Select.Option>
              <Select.Option value={2}>1</Select.Option>
            </Select>
          </Col>
          <Col span={24}>
            <Radio.Group onChange={onChangeRadio} value={value}>
              <ul>
                <li>
                  <Radio value={1}>
                    <p>test 1</p>
                    <h6>
                      {" "}
                      <CalendarOutlined /> 11/05/2022 <FolderOutlined /> test
                    </h6>
                  </Radio>
                </li>
                <li>
                  <Radio value={2}>
                    <p>test 1</p>
                    <h6>
                      {" "}
                      <CalendarOutlined /> 11/05/2022 <FolderOutlined /> test
                    </h6>
                  </Radio>
                </li>
                <li>
                  <Radio value={3}>
                    <p>test 1</p>
                    <h6>
                      {" "}
                      <CalendarOutlined /> 11/05/2022 <FolderOutlined /> test
                    </h6>
                  </Radio>
                </li>
              </ul>
            </Radio.Group>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SelectTest;
