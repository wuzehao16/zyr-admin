import { stringify } from 'qs';
import request from '../utils/request';

export async function msgPhone(params) {
  return request('/sysAnno/sendLoginMessage', {
    method: 'POST',
    body: params,
  });
}
export async function msgEmail(params) {
  return request('sysAnno/sendLoginEmail',{
    method: 'POST',
    body: params,
  })
}
export async function resetPassword(params) {
  return request('sysAnno/myPwdOrEmail',{
    method: 'POST',
    body: params,
  })
}
