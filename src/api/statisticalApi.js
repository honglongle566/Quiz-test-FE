import axiosClient from './axiosClient';

const statisticalApi = {
  getAllPagingCandidate() {
    const url = `/api/candidate/getall`;
    return axiosClient.get(url);
  },
  getAllPagingTest() {
    const url = `/api/statistical/exam`;
    return axiosClient.get(url);
  },
  getAllPagingTestCamapain() {
    const url = `/api/statistical`;
    return axiosClient.get(url);
  },
  getListTestCamapain(param) {
    const url = `/api/candidate`;
    return axiosClient.get(url, param);
  },
  getDashboard() {
    const url = `api/statistical/total`;
    return axiosClient.get(url);
  },
};

export default statisticalApi;
