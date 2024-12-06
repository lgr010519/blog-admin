import { request } from '@/api/request';

export function getData() {
  return request({
    url: '/admin/config/home/getData',
    method: 'GET',
  });
}

export function saveOrUpdate(data) {
  return request({
    url: '/admin/config/home/saveOrUpdate',
    method: 'POST',
    data,
  });
}
