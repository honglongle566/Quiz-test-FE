import axiosClient from './axiosClient';

const examRoomApi = {
  getAll() {
    const url = `/api/examination-room`;
    return axiosClient.get(url);
  },
  getAllPaging(params) {
    const url = `/api/examination-room/all-paging`;
    return axiosClient.get(url, params);
  },
  create(data) {
    const url = '/api/examination-room';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/api/examination-room/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(data) {
    const url = `/api/examination-room/${data.id}`;
    return axiosClient.delete(url);
  },
};

export default examRoomApi;
