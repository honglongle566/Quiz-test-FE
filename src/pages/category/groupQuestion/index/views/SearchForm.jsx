import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showDialog, onSearch } from "slices/category/questionGroup";
const { Search } = Input;

const SearchForm = () => {
  const { t } = useTranslation("category", "common");
  const dispatch = useDispatch();

  return (
    <Row justify="space-between" align="middle" className="mb-1">
      <Col span={8}>
        <Search
          size="large"
          className="search-btn"
          placeholder={t("search_question_group", { ns: "category" })}
          onSearch={(values) => dispatch(onSearch(values))}
        />
      </Col>
      <Col span={8} className="item-right">
        <Button
          type="primary"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={() => dispatch(showDialog())}
        >
          {t("new_questiongroup", { ns: "category" })}
        </Button>
      </Col>
    </Row>
  );
};

export default SearchForm;
