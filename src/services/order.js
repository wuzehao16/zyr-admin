import { stringify } from 'qs';
import request from '../utils/request';

export async function queryDict(params) {
  return request(`/sys/selectDictionary?${stringify(params)}`);
}
export async function query(params) {
  return request(`/sys/selectOrder?${stringify(params)}`);
}
export async function queryDetail(params) {
  return request(`/sys/selectDetailsOrder?${stringify(params)}`);
}
export async function queryByInstitution(params) {
  return request(`/sys/selectOrderByManageId?${stringify(params)}`);
}

export async function updateOrderState(params) {
  return request('/sys/updateOrderStauts', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function remove(params) {
  return request(`/sys/deleteOrder/${params.id}`, {
    method: 'Delete',
  });
}
