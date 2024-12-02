import { request } from '@/api/request';

export function getList(params) {
  return request({
    url: '/admin/user/getList',
    method: 'GET',
    params,
  });
}

export function remove(params) {
  return request({
    url: '/admin/user/remove',
    method: 'DELETE',
    params,
  });
}
