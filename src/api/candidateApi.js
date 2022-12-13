import axiosClient from './axiosClient';

const candidateApi = {
  create(data) {
    const url = '/api/candidate';
    return axiosClient.post(url, data);
  },
};

export default candidateApi;
