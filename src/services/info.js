import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/sys/selectAllPMI?${stringify(params)}`);
}
export async function querySysInfo(params) {
  return request(`/sys/selectAllMI?${stringify(params)}`);
}
export async function queryDetail(params) {
  return request(`/sys/selectPMIDetail?${stringify(params)}`);
}

export async function update(params) {
  return request('/sys/updatePMI', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function upPMIState(params) {
  return request('/sys/updatePMIStatus', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function remove(params) {
  return request(`/sys/deletePMI/${params.id}`, {
    method: 'Delete',
  });
}

export async function add(params) {
  return request('/sys/insertPMI', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
