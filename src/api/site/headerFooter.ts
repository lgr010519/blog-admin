import { request } from '@/api/request';

export function getData() {
  return request({
    url: '/admin/config/hf/getData',
    method: 'GET',
  });
}

export function saveOrUpdate(data) {
  return request({
    url: '/admin/config/hf/saveOrUpdate',
    method: 'POST',
    data,
  });
}
