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
  getResult(id) {
    const url = '/api/candidate-result-detail/' + id;
    return axiosClientDoTest.get(url, id);
  },
};

export default candidateResultDetailApi;
