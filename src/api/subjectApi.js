import axiosClient from './axiosClient';

const subjectApi = {
  create(data) {
    const url = '/api/subject';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/api/subject/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(data) {
    const url = `/api/subject/${data.id}`;
    return axiosClient.delete(url);
  },
  move(data) {
    const url = `/api/subject/${data.id}/move`;
    return axiosClient.put(url, data);
  },
};

export default subjectApi;
