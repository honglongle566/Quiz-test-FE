import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Badge, Table, Button, Space, Modal, Progress } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatTime } from "../../../../utils/statistic";
import { useDispatch } from "react-redux";
const { Column } = Table;
function TestResultTable() {
  const { t } = useTranslation("test", "common");
  const dispatch = useDispatch();
  const onDelete = (id) => {
    Modal.confirm({
      title: `${t("Do_you_want_to_remove_the_result?", { ns: "test" })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t("button.ok", { ns: "common" })}`,
      cancelText: `${t("button.cancel", { ns: "common" })}`,
      onOk: () => onDeleteOK(id),
    });
  };

  const onDeleteOK = (id) => {};

  const showEvaluate = () => {
    return (
      <Space size="middle">
        <Badge
          count={t("need_grade", { ns: "statistic" })}
          style={{
            backgroundColor: "#dc3545",
          }}
        ></Badge>
      </Space>
    );
    return (
      <Space size="middle">
        <Badge
          count={t("passed", { ns: "statistic" })}
          style={{
            backgroundColor: "#06ba02",
          }}
        ></Badge>
      </Space>
    );
    return (
      <Space size="middle">
        <Badge
          count={t("failed", { ns: "statistic" })}
          style={{
            backgroundColor: "#1b2150",
          }}
        ></Badge>
      </Space>
    );
  };
  return (
    <div className="table-box">
      <table>
        <thead className="ant-table-thead">
          <tr>
            <th>{t("INFORMATION_CONTESTANTS", { ns: "test" })}</th>
            <th>{t("COMPLETE_PERCENT", { ns: "test" })}</th>
            <th>{t("RESULT", { ns: "test" })}</th>
            <th>{t("DURATION", { ns: "test" })}</th>
            <th>{t("CREATED_AT", { ns: "test" })}</th>
            <th></th>
            <th>{t("ACTION", { ns: "test" })}</th>
          </tr>
        </thead>
        <tbody className="ant-table-tbody">
          <tr>
            <td>fullname</td>
            <td>
              <Progress percent={10} />
            </td>
            <td>score</td>
            <td>time_do_test</td>
            <td>createdAt</td>
            <td>{showEvaluate()}</td>
            <td>
              <Space size="middle">
                <Link to={`/results/record.id`} className="btn-link">
                  {t("View_Detail", { ns: "test" })}
                </Link>
                <Button icon={<DeleteOutlined />} type="text"></Button>
              </Space>
            </td>
          </tr>
          <tr>
            <td>fullname</td>
            <td>
              <Space size="middle">
                <p>10</p>
                <progress value={10} max={100} />
              </Space>
            </td>
            <td>score</td>
            <td>time_do_test</td>
            <td>createdAt</td>
            <td>{showEvaluate()}</td>
            <td>
              <Space size="middle">
                <Link to={`/results/record.id`} className="btn-link">
                  {t("View_Detail", { ns: "test" })}
                </Link>
                <Button icon={<DeleteOutlined />} type="text"></Button>
              </Space>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TestResultTable;
