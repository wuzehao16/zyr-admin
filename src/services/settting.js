import { stringify } from 'qs';
import request from '../utils/request';

export async function queryDict(params) {
  return request(`/sys/selectDictionary?${stringify(params)}`);
}
export async function queryOldPhoneCaptcha(params) {
  return request(`/sys/getCodeByOldPhone?${stringify(params)}`);
}
export async function query(params) {
  return request(`/sys/getCodeByNewPhone?${stringify(params)}`);
}
export async function query(params) {
  return request(`/sys/selectAds?${stringify(params)}`);
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
