import axios, { AxiosRequestConfig } from 'axios';
import { Notification } from '@arco-design/web-react';

export const request = (config: AxiosRequestConfig) => {
  const http = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 60000,
  });

  // 请求拦截
  http.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      token && (config.headers.Authorization = 'Bearer ' + token);

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截
  http.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res;
    },
    (error) => {
      Notification.error({
        title: '错误',
        content: error.message,
      });

      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  return http(config);
};
