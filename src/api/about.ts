import { request } from '@/api/request';

export function queryAbout() {
  return request({
    url: '/admin/about/getList',
    method: 'GET',
  });
}

export function saveOrUpdate(data) {
  return request({
    url: '/admin/about/saveOrUpdate',
    method: 'POST',
    data,
  });
}
