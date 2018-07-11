import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/sys/getMatchModeList?${stringify(params)}`);
}
export async function queryDetail(params) {
  return request(`/sys/getModeResultInfo?${stringify(params)}`);
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
