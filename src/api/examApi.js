import axiosClient from './axiosClient';

const examApi = {
  getAllPaging(params) {
    const url = `/api/test/all-paging`;
    return axiosClient.get(url, params);
  },
  create(data) {
    const url = '/api/test';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/api/test/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(data) {
    const url = `/api/test/${data.id}`;
    return axiosClient.delete(url);
  },
};

export default examApi;
