import { stringify } from 'qs';
import request from '../utils/request';

export async function msgPhone(params) {
  return request('/mapi/sysAnno/sendLoginMessage', {
    method: 'POST',
    body: params,
  });
}
export async function validataPhone(params) {
  return request('/mapi/sysAnno/vaLidatacode',{
    method: 'POST',
    body: params,
  })
}
export async function msgEmail(params) {
  return request('/mapi/sysAnno/sendLoginEmail',{
    method: 'POST',
    body: params,
  })
}
export async function getInstitutionType(params) {
  return request('/mapi/sysAnno/queryAllInstitution',{
    method: 'POST',
    body: params,
  })
}
export async function getInstitution(params) {
  return request('/mapi/sysAnno/InstitutionManageParent',{
    method: 'POST',
    body: params,
  })
}
export async function getSubInstitution(params) {
  return request('/mapi/sysAnno/InstitutionManageSub',{
    method: 'POST',
    body: params,
  })
}
export async function register(params) {
  return request('/mapi/sysAnno/register',{
    method: 'POST',
    body: params,
  })
}
