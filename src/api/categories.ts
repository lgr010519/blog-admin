import { request } from '@/api/request';

export function getList(params) {
  return request({
    url: '/admin/category/getList',
    method: 'GET',
    params,
  });
}

export function saveOrUpdate(data) {
  return request({
    url: '/admin/category/saveOrUpdate',
    method: 'POST',
    data,
  });
}

export function remove(params) {
  return request({
    url: '/admin/category/remove',
    method: 'DELETE',
    params,
  });
}
