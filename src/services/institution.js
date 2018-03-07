import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/sys/selectInstitutionManage?${stringify(params)}`);
}
export async function queryDetail(params) {
  return request(`/sys/viewdetailInstitutionManage?${stringify(params)}`);
}

export async function update(params) {
  return request('/sys/editInstitutionManage', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function review(params) {
  return request('/sys/updateStatusInstitution', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function updatePassword(params) {
  return request('/sys/editPasswordUser', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function add(params) {
  return request('/sys/addInstitutionManage', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
