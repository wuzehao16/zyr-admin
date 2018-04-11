import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/sys/selectProduct?${stringify(params)}`);
}
export async function queryManage(params) {
  return request(`/sys/selectMapManageParameter?${stringify(params)}`);
}
export async function queryDetail(params) {
  return request(`/sys/detailsProduct?${stringify(params)}`);
}

export async function update(params) {
  return request('/sys/editProduct', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function updateAprovalStatus(params) {
  return request('/sys/updateAprovalStatusProduct', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function updateShelvesStatus(params) {
  return request('/sys/updateShelfStateProduct', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function remove(params) {
  return request(`/sys/deleteProduct/${params.productId}`, {
    method: 'Delete',
  });
}

export async function add(params) {
  return request('/sys/addProduct', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
