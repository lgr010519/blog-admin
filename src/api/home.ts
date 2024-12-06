import { request } from '@/api/request';

export function getUserGrowthList() {
  return request({
    url: '/admin/home/getUserGrowthList',
    method: 'GET',
  });
}
