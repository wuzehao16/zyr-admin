import { stringify } from 'qs';
import request from '../utils/request';

export async function queryUser(params) {
  return request(`/mapi/sys/selectUsers?${stringify(params)}`);
}
export async function queryAllRole(params) {
  return request(`/mapi/sys/selectAllRole?${stringify(params)}`);
}

export async function removeUser(params) {
  return request(`/mapi/sys/deleteUser/${params.userId}`, {
    method: 'Delete',
  });
}
export async function updateUser(params) {
  return request('/mapi/sys/updateUser', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addUser(params) {
  return request('/mapi/sys/insertUser', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryDict(params) {
  return request(`/mapi/sys/selectDictionary?${stringify(params)}`);
}

export async function removeDict(params) {
  return request(`/mapi/sys/deleteDictionary/${params.id}`, {
    method: 'Delete',
  });
}
export async function updateDict(params) {
  return request('/mapi/sys/updateDictionary', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function addDict(params) {
  return request('/mapi/sys/saveDictionary', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function queryMenu(params) {
  return request(`/mapi/sys/selectMenuAll?${stringify(params)}`);
}
export async function removeMenu(params) {
  return request(`/mapi/sys/deleteMenu/${params.meunId}`, {
    method: 'Delete',
  });
}
export async function updateMenu(params) {
  return request('/mapi/sys/updateMenu', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addMenu(params) {
  return request('/mapi/sys/saveMenu', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function queryRole(params) {
  return request(`/mapi/sys/selectAllRole?${stringify(params)}`);
}
export async function removeRole(params) {
  return request(`/mapi/sys/deleteRoles/${params.userId}`, {
    method: 'Delete',
  });
}
export async function updateRole(params) {
  return request('/mapi/sys/updateRole', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addRole(params) {
  return request('/mapi/sys/insertRole', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
