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

export async function queryDict(params) {
  return request(`/api/sys/selectDictionary?${stringify(params)}`);
}

export async function removeDict(params) {
  console.log(params)
  return request(`/api/sys/deleteDictionary/${params.id}`, {
    method: 'Delete',
  });
}
export async function updateDict(params) {
  return request('/api/sys/updateDictionary', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addDict(params) {
  return request('/api/sys/saveDictionary', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
