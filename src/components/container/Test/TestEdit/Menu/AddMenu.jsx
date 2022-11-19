import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function AddMenu({ addRandomQues, closeDropDown }) {
  const { t } = useTranslation("test");
  const randomQues = () => {
    addRandomQues();
    closeDropDown();
  };
  return (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link to="/questions">{t("add_new_question", { ns: "test" })}</Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link to="/questions">{t("my_question_bank", { ns: "test" })}</Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link to="/questions">
              {t("import_spreadsheet", { ns: "test" })}
            </Link>
          ),
        },
        {
          key: "4",
          label: (
            <Link to="/questions">
              {t("import_from_markdown_file", { ns: "test" })}
            </Link>
          ),
        },
        {
          key: "5",
          label: (
            <span onClick={randomQues}>
              {t("random_question", { ns: "test" })}
            </span>
          ),
        },
      ]}
    />
  );
}

export default AddMenu;
