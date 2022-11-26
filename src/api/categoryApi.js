import axiosClient from './axiosClient';

const categoryApi = {
  getAll() {
    const url = `/api/category`;
    return axiosClient.get(url);
  },
  getAllPaging(params) {
    const url = `/api/category/all-paging`;
    return axiosClient.get(url, params);
  },
  create(data) {
    const url = '/api/category';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/api/category/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(data) {
    const url = `/api/category/${data.id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
