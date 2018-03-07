import { stringify } from 'qs';
import request from '../utils/request';

export async function queryOldPhoneCaptcha(params) {
  return request(`/sys/getCodeByOldPhone?${stringify(params)}`);
}
export async function queryNewPhoneCaptcha(params) {
  return request(`/sys/getCodeByNewPhone?${stringify(params)}`);
}
export async function queryOldEmailCaptcha(params) {
  return request(`/sys/getCodeByOldEMail?${stringify(params)}`);
}
export async function queryNewEmailCaptcha(params) {
  return request(`/sys/getCodeByNewEMail?${stringify(params)}`);
}


export async function updatePassword(params) {
  return request('/sys/updatePWD', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function updatePhone(params) {
  return request('/sys/bindingPhone', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function updateEmail(params) {
  return request('/sys/bindingEMail', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
