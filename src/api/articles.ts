import { request } from '@/api/request';

export function getList(params) {
  return request({
    url: '/admin/article/getList',
    method: 'GET',
    params,
  });
}

export function saveOrUpdate(data) {
  return request({
    url: '/admin/article/saveOrUpdate',
    method: 'POST',
    data,
  });
}

export function updateStatus(data) {
  return request({
    url: '/admin/article/updateStatus',
    method: 'POST',
    data,
  });
}

export function getDetail(params) {
  return request({
    url: `/admin/article/getDetail`,
    method: 'GET',
    params,
  });
}

export function remove(params) {
  return request({
    url: '/admin/article/remove',
    method: 'DELETE',
    params,
  });
}

export function updateCollectBatch(data) {
  return request({
    url: '/admin/article/updateCollectBatch',
    method: 'POST',
    data,
  });
}
