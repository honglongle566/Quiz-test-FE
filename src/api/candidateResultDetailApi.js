import axiosClientDoTest from './axiosClientDoTest';

const candidateResultDetailApi = {
  create(data) {
    const url = '/api/candidate-result-detail';
    return axiosClientDoTest.post(url, data);
  },
  update(data) {
    const url = '/api/candidate-result-detail';
    return axiosClientDoTest.put(url, data);
  },
};

export default candidateResultDetailApi;
