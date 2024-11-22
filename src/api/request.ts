import axios, { AxiosRequestConfig } from 'axios';
import { Message } from '@arco-design/web-react';

export const request = (config: AxiosRequestConfig) => {
  const http = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 60000,
  });

  // 请求拦截
  http.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
        config.headers['access-token'] = token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截
  http.interceptors.response.use(
    (res) => {
      if (res.data.code && res.data.code !== 200) {
        if (res.data.code === 305) {
          location.href = '/login';
        }

        return Promise.reject(new Error(res.data.message));
      }

      return res.data;
    },
    (error) => {
      Message.error(error.message);

      return Promise.reject(error);
    }
  );

  return http(config);
};
