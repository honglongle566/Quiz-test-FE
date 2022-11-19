import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { onSearch, showDialog } from "slices/category/categoryGroup";

const { Search } = Input;

const SearchForm = () => {
  const { t } = useTranslation("category");
  const dispatch = useDispatch();

  return (
    <Row justify="space-between" align="middle" className="mb-1">
      <Col span={8}>
        <Search
          size="large"
          className="search-btn"
          placeholder={t("search_category", { ns: "category" })}
          onSearch={(values) => dispatch(onSearch(values))}
        />
      </Col>
      <Col span={8} className="item-right">
        <Button
          type="primary"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={() => dispatch(showDialog({ type: "CREATE_NEW" }))}
        >
          {t("new_group_category", { ns: "category" })}
        </Button>
      </Col>
    </Row>
  );
};

export default SearchForm;
