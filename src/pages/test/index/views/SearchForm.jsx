import { Col, Input, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
const { Search } = Input;
const { Option, OptGroup } = Select;

const SearchForm = () => {
  const { t } = useTranslation("test");
  const onSearch = (values) => {};
  const handleChange = () => {};

  return (
    <Row gutter={24} align="middle" justify="start" className="mb-1">
      <Col span={8}>
        <Search
          className="search-btn"
          size="large"
          placeholder={t("enter_keyword_to_search_tests", { ns: "test" })}
          loading={false}
          onSearch={onSearch}
        />
      </Col>
      <Col span={8}>
        <Select
          defaultValue="lucy"
          onChange={handleChange}
          className="select"
          size="large"
        >
          <OptGroup label="Manager">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </OptGroup>
          <OptGroup label="Engineer">
            <Option value="Yiminghe">yiminghe</Option>
          </OptGroup>
        </Select>
      </Col>
      <Col span={8}>
        <Select
          placeholder="Search to Select"
          onChange={handleChange}
          className="select"
          size="large"
        >
          <Option value="1">Tạo gần đây</Option>
          <Option value="2">A-Z</Option>
          <Option value="2">Z-A</Option>
        </Select>
      </Col>
    </Row>
  );
};

export default SearchForm;
