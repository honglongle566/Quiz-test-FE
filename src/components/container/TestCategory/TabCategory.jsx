import { CaretRightOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Input, Modal, Pagination, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "./Category/Card";
import AddCard from "./Category/Forms/AddCard";
import AddSubCard from "./Category/Forms/AddSubCard";
import EditCard from "./Category/Forms/EditCard";
import MoveSubCard from "./Category/Forms/MoveSubCard";
import {
  getTestCategory,
  testCategorySelector,
} from "../../../slices/testCategory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const { Search } = Input;

function TabCategory() {
  const { t } = useTranslation("category");
  const [keyword, setKeyword] = useState("");
  const [isAddCard, setIsAddCard] = useState(false);
  const [isAddSubCard, setIsAddSubCard] = useState(false);
  const [isExitCard, setIsExitCard] = useState(false);
  const [isMovdeSubCard, setIsMoveSubCard] = useState(false);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [page, setPage] = useState(1);

  const {
    testCategory,
    isLoading,
    categories,
    pagination: { current_page, total, per_page },
  } = useSelector(testCategorySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestCategory({ page, per_page, keyword }));
  }, [page, keyword]);

  return (
    <>
      <Row justify="space-between" align="middle" className="mb-1">
        <Col span={8}>
          <Search
            size="large"
            className="search-btn"
            placeholder={t("search_category", { ns: "category" })}
            onSearch={(values) => setKeyword(values)}
          />
        </Col>
        <Col span={8} className="item-right">
          <Button
            type="primary"
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => setIsAddCard(true)}
          >
            {t("new_group_category", { ns: "category" })}
          </Button>
        </Col>
      </Row>

      <Collapse
        expandIconPosition="end"
        expandIcon={() => <CaretRightOutlined rotate={90} />}
        ghost
      >
        {testCategory.length > 0 &&
          testCategory.map((card) => (
            <Card
              key={card._id}
              data={card}
              onShowExitCard={() => setIsExitCard(true)}
              onShowMoveCard={() => setIsMoveSubCard(true)}
              onShowAddSubCard={() => setIsAddSubCard(true)}
              setCategory={setCategory}
              setSubCategory={setSubCategory}
            />
          ))}
      </Collapse>
      <Row justify="center" align="center">
        <Pagination
          current={current_page}
          onChange={(values) => setPage(values)}
          total={total}
          pageSize={per_page}
          hideOnSinglePage={total < per_page}
        />
      </Row>
      <Modal
        title={t("create_category", { ns: "category" })}
        visible={isAddCard}
        onOk={() => setIsAddCard(false)}
        onCancel={() => setIsAddCard(false)}
        style={{ top: 25 }}
        footer={null}
      >
        <AddCard onCancel={() => setIsAddCard(false)} />
      </Modal>
      <Modal
        visible={isAddSubCard}
        onOk={() => setIsAddSubCard(false)}
        onCancel={() => setIsAddSubCard(false)}
        title={t("new_sub_category1", { ns: "category" })}
        style={{ top: 25 }}
        footer={null}
      >
        <AddSubCard onCancel={() => setIsAddSubCard(false)} parent={category} />
      </Modal>
      <Modal
        title={t("update_category", { ns: "category" })}
        visible={isExitCard}
        onOk={() => setIsExitCard(false)}
        onCancel={() => setIsExitCard(false)}
        style={{ top: 25 }}
        footer={null}
      >
        <EditCard onCancel={() => setIsExitCard(false)} category={category} />
      </Modal>
      <Modal
        title={t("move_sub_category", { ns: "category" })}
        visible={isMovdeSubCard}
        onCancel={() => setIsMoveSubCard(false)}
        style={{ top: 25 }}
        footer={null}
      >
        <MoveSubCard
          onCancel={() => setIsMoveSubCard(false)}
          categories={categories}
          currentParent={category}
          child={subCategory}
        />
      </Modal>
    </>
  );
}

export default TabCategory;
