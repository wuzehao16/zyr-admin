import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/sys/selectMemberRank?${stringify(params)}`);
}
export async function remove(params) {
  return request(`/sys/deleteMemberRank/${params.roleId}`, {
    method: 'Delete',
  });
}
export async function update(params) {
  return request('/sys/updateMemberRank', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function add(params) {
  return request('/sys/insertMemberRank', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
