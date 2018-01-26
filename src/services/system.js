import { stringify } from 'qs';
import request from '../utils/request';

export async function queryUser(params) {
  return request(`/sys/selectUsers?${stringify(params)}`);
}
export async function queryAllRole(params) {
  return request(`/sys/selectAllRole?${stringify(params)}`);
}

export async function removeUser(params) {
  return request(`/sys/deleteUser/${params.userId}`, {
    method: 'Delete',
  });
}
export async function updateUser(params) {
  return request('/sys/updateUser', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addUser(params) {
  return request('/sys/insertUser', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryDict(params) {
  return request(`/sys/selectDictionary?${stringify(params)}`);
}

export async function removeDict(params) {
  return request(`/sys/deleteDictionary/${params.id}`, {
    method: 'Delete',
  });
}
export async function updateDict(params) {
  return request('/sys/updateDictionary', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function addDict(params) {
  return request('/sys/saveDictionary', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function queryMenu(params) {
  return request(`/sys/selectMenuAll?${stringify(params)}`);
}
export async function removeMenu(params) {
  return request(`/sys/deleteMenu/${params.meunId}`, {
    method: 'Delete',
  });
}
export async function updateMenu(params) {
  return request('/sys/updateMenu', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addMenu(params) {
  return request('/sys/saveMenu', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function queryRole(params) {
  return request(`/sys/selectAllRole?${stringify(params)}`);
}
export async function removeRole(params) {
  return request(`/sys/deleteRoles/${params.roleId}`, {
    method: 'Delete',
  });
}
export async function updateRole(params) {
  return request('/sys/updateRole', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function addRole(params) {
  return request('/sys/insertRole', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
