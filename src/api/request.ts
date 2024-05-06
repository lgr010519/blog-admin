import axios from 'axios';
import { Notification } from '@arco-design/web-react';

export const request = (config) => {
  const http = axios.create({
    baseURL: 'http://localhost:8080',
    // timeout: 5000,
  });

  // 请求拦截
  http.interceptors.request.use(
    (config) => {
      if (config.method === 'put' || config.method === 'delete') {
        const id = config.data._id || config.data.id;
        config.url += `/${id}`;
      }
      const token = localStorage.getItem('token');
      config.headers = {
        Authorization: 'Bearer ' + token,
      };
      return config;
    },
    (error) => {
      console.log('requestError', error);
    }
  );
  // 响应拦截
  http.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res;
    },
    (error) => {
      console.log('responseError', error.response);
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
        Notification.error({
          title: '错误',
          content: '登录状态过期，请重新登录',
        });
      }
    }
  );

  return http(config);
};
