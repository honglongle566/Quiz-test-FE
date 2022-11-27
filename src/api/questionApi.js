import axiosClient from './axiosClient';

const questionApi = {
  getAll() {
    const url = `/api/question`;
    return axiosClient.get(url);
  },
  getAllPaging(params) {
    const url = `/api/question/all-paging`;
    return axiosClient.get(url, params);
  },
  getById(id) {
    const url = `/api/question/${id}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/question';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/api/question/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(data) {
    const url = `/api/question/${data.id}`;
    return axiosClient.delete(url);
  },
};

export default questionApi;
