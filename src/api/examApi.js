import axiosClient from './axiosClient';

const examApi = {
  getAllPaging(params) {
    const url = `/api/exam/all-paging`;
    return axiosClient.get(url, params);
  },
  getById(id) {
    const url = `/api/exam/${id}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/exam';
    return axiosClient.post(url, data);
  },
  createQuestion(id, data) {
    const url = `/api/exam/${id}/question`;
    return axiosClient.post(url, data);
  },
  addQuestionsToExam(id, data) {
    const url = `/api/exam/${id}/add-question`;
    return axiosClient.put(url, data);
  },
  removeQuestionsToExam(id, data) {
    const url = `/api/exam/${id}/remove-question`; //data { questions": [1, 2, 2, 3, 4, 5]}
    return axiosClient.put(url, data);
  },
  update(data) {
    const url = `/api/exam/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(id) {
    const url = `/api/exam/${id}`;
    return axiosClient.delete(url);
  },
};

export default examApi;
