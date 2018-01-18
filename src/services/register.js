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
export async function msgEmail(params) {
  return request('sysAnno/sendLoginEmail',{
    method: 'POST',
    body: params,
  })
}
export async function getInstitution(params) {
  return request('sysAnno/getInstitutionByCityCode',{
    method: 'POST',
    body: params,
  })
}
export async function getSubInstitution(params) {
  return request('sysAnno/getSubInstitutionByInstitutionCode',{
    method: 'POST',
    body: params,
  })
}
export async function register(params) {
  return request('sysAnno/register',{
    method: 'POST',
    body: params,
  })
}
