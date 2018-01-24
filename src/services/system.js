import { stringify } from 'qs';
import request from '../utils/request';

export async function queryUser(params) {
  return request(`/api/sys/selectUsers?${stringify(params)}`);
}
export async function queryAllRole(params) {
  return request(`/api/sys/selectAllRole?${stringify(params)}`);
}

export async function removeUser(params) {
  return request(`/api/sys/deleteUser/${params.userId}`, {
    method: 'Delete',
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
    },
  });
}

export async function queryDict(params) {
  return request(`/api/sys/selectDictionary?${stringify(params)}`);
}

export async function removeDict(params) {
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
export async function queryMenu(params) {
  return request(`/api/sys/selectMenuAll?${stringify(params)}`);
}
export async function removeMenu(params) {
  return request(`/api/sys/deleteMenu/${params.userId}`, {
    method: 'Delete',
  });
}
export async function updateMenu(params) {
  return request('/api/sys/updateMenu', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addMenu(params) {
  return request('/api/sys/insertMenu', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function queryRole(params) {
  return request(`/api/sys/selectAllRole?${stringify(params)}`);
}
export async function removeRole(params) {
  return request(`/api/sys/deleteRoles/${params.userId}`, {
    method: 'Delete',
  });
}
export async function updateRole(params) {
  return request('/api/sys/updateRole', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addRole(params) {
  return request('/api/sys/insertRole', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
