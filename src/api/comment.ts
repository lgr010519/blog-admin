import { request } from '@/api/request';

export function getList(params) {
  return request({
    url: '/admin/comment/getList',
    method: 'GET',
    params,
  });
}

export function updateStatus(params) {
  return request({
    url: '/admin/comment/updateStatus',
    method: 'GET',
    params,
  });
}

export function remove(params) {
  return request({
    url: '/admin/comment/remove',
    method: 'DELETE',
    params,
  });
}
