import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/sys/selectAppUser?${stringify(params)}`);
}
export async function queryDetail(params) {
  return request(`/sys/selectAppUserDetail?${stringify(params)}`);
}

export async function update(params) {
  return request('/sys/updateAppuser', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function updatePassword(params) {
  return request('/sys/updatePassword', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
