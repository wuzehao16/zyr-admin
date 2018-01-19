import { stringify } from 'qs';
import request from '../utils/request';

export async function msgPhone(params) {
  return request('/mapi/sysAnno/sendMessage', {
    method: 'POST',
    body: params,
  });
}
export async function msgEmail(params) {
  return request('/mapi/sysAnno/sendEmail',{
    method: 'POST',
    body: params,
  })
}
export async function resetPassword(params) {
  return request('/mapi/sysAnno/myPwdOrEmail',{
    method: 'POST',
    body: params,
  })
}
