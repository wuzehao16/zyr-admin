import { stringify } from 'qs';
import request from '../utils/request';

export async function queryRule(params) {
  return request(`/api/systemUser?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/systemUser', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/systemUser', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
