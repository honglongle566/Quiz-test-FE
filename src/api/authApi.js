import axiosClient from './axiosClient';

const authApi = {
  getAuth() {
    const url = `api/user`;
    return axiosClient.get(url);
  },
  register(data) {
    const url = 'api/user/register';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = 'api/user/login';
    return axiosClient.post(url, data);
  },
};

export default authApi;
