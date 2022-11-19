import axiosClient from "./axiosClient";
import { objectToQueryString } from "../utils/statistic";

const questionGroupApi = {
  getAll(query) {
    const url = `api/question-group${objectToQueryString(query)}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = "/api/question-group";
    return axiosClient.post(url, data);
  },
  updateById(data) {
    const url = `api/question-group/${data._id}`;
    console.log("url", url, data);
    return axiosClient.patch(url, data);
  },
  deleteById(id) {
    const url = `/api/question-group/${id}`;
    return axiosClient.delete(url);
  },
};

export default questionGroupApi;
