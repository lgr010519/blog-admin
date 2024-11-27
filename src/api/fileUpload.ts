import { request } from '@/api/request';

export function fileUpload(data) {
  return request({
    url: '/admin/file/upload',
    method: 'POST',
    data,
  });
}
