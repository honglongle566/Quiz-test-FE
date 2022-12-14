import axiosClient from './axiosClient';

const questionGroupApi = {
  getAll() {
    const url = `/api/group-question`;
    return axiosClient.get(url);
  },
  getAllPaging(params) {
    const url = `/api/group-question/all-paging`;
    return axiosClient.get(url, params);
  },
  create(data) {
    const url = '/api/group-question';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/api/group-question/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(data) {
    const url = `/api/group-question/${data.id}`;
    return axiosClient.delete(url);
  },
};

export default questionGroupApi;
