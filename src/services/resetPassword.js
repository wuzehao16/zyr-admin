import { stringify } from 'qs';
import request from '../utils/request';

export async function msgPhone(params) {
  return request('/sysAnno/sendMessage', {
    method: 'POST',
    body: params,
  });
}
export async function msgEmail(params) {
  return request('/sysAnno/sendEmail',{
    method: 'POST',
    body: params,
  })
}
export async function resetPassword(params) {
  return request('/sysAnno/myPwdOrEmail',{
    method: 'POST',
    body: params,
  })
}
