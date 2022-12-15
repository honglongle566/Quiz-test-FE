import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_NAME } from 'slices/core/appState';

const axiosClientDoTest = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClientDoTest.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosClientDoTest.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosClientDoTest;
