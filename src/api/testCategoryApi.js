import axiosClient from "./axiosClient";
import { objectToQueryString } from "../utils/statistic";

const testCategoryApi = {
  getAll(query) {
    const url = `/api/test-category${objectToQueryString(query)}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = "/api/test-category";
    return axiosClient.post(url, data);
  },
  updateById(data) {
    const url = `/api/test-category/${data._id}`;
    return axiosClient.patch(url, data);
  },
  deleteById(data) {
    const url = `/api/test-category/${data._id}`;
    return axiosClient.delete(url);
  },
  createSub(data) {
    const url = `/api/sub-category`;
    return axiosClient.post(url, data);
  },
  updateSub(data) {
    const url = `/api/sub-category/${data._id}`;
    return axiosClient.patch(url, data);
  },
  moveSub(data) {
    const url = `/api/sub-category/move/${data.sub._id}`;
    return axiosClient.patch(url, { new_parent_id: data.new_parent_id });
  },
  deleteSub(data) {
    const url = `/api/sub-category/${data._id}`;
    return axiosClient.delete(url);
  },
};

export default testCategoryApi;
