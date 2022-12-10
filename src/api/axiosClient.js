import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_NAME } from 'slices/core/appState';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosClient;
