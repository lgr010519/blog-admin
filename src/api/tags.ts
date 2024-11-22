import { request } from '@/api/request';

export function getList(params) {
  return request({
    url: '/admin/tag/getList',
    method: 'GET',
    params,
  });
}

export function saveOrUpdate(data) {
  return request({
    url: '/admin/tag/saveOrUpdate',
    method: 'POST',
    data,
  });
}

export function remove(params) {
  return request({
    url: '/admin/tag/remove',
    method: 'DELETE',
    params,
  });
}
