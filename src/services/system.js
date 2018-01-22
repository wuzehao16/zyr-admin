import { stringify } from 'qs';
import request from '../utils/request';

export async function queryUser(params) {
  return request(`/api/sys/selectUsers?${stringify(params)}`);
}

export async function removeUser(params) {
  return request('/api/sys/deleteUser', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function updateUser(params) {
  return request('/api/sys/updateUser', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addUser(params) {
  return request('/api/sys/insertUser', {
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
    },
  });
}
