import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/sys/selectModelList?${stringify(params)}`);
}
export async function queryDetail(params) {
  return request(`/sys/selectAdsDetail?${stringify(params)}`);
}

export async function update(params) {
  return request('/sys/updateAds', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function upAdsState(params) {
  return request('/sys/upStateAds', {
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
