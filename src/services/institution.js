import { stringify } from 'qs';
import request from '../utils/request';

export async function queryRule(params) {
  return request(`/api/institution?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/institution', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/institution', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
