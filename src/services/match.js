import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/sys/selectModelList?${stringify(params)}`);
}
export async function queryAI(params) {
  return request(`/sys/selectModeAlgorithm?${stringify(params)}`);
}
export async function queryDetail(params) {
  return request(`/sys/selectModelDetail?${stringify(params)}`);
}
export async function queryAIDetail(params) {
  return request(`/sys/selectModeAlgorithm?${stringify(params)}`);
}

export async function update(params) {
  return request('/sys/updateModelInfo', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function updateStatus(params) {
  return request('/sys/updateStatus', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function remove(params) {
  return request(`/sys/deleteAds/${params.adsId}`, {
    method: 'Delete',
  });
}

export async function add(params) {
  return request('/sys/insertModelInfo', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function addAi(params) {
  return request('/sys/insertModeAlgorithm', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
