import { stringify } from 'qs';
import request from '../utils/request';

export async function msgPhone(params) {
  return request('/sysAnno/sendLoginMessage', {
    method: 'POST',
    body: params,
  });
}
export async function validataPhone(params) {
  return request('/sysAnno/vaLidatacode',{
    method: 'POST',
    body: params,
  })
}
