import { request } from '@/api/request';

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'POST',
    data,
  });
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'POST',
  });
}

export function getCaptcha() {
  return request({
    url: '/admin/login/captcha',
    method: 'GET',
  });
}

export function getUserInfo() {
  return request({
    url: '/admin/userInfo',
    method: 'GET',
  });
}
