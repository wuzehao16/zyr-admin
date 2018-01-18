import { stringify } from 'qs';
import request from '../utils/request';

export async function msgPhone(params) {
  return request('/api/sysAnno/sendLoginMessage', {
    method: 'POST',
    body: params,
  });
}
export async function validataPhone(params) {
  return request('/api/sysAnno/vaLidatacode',{
    method: 'POST',
    body: params,
  })
}
export async function msgEmail(params) {
  return request('/api/sysAnno/sendLoginEmail',{
    method: 'POST',
    body: params,
  })
}
export async function getInstitutionType(params) {
  return request('/api/sysAnno/queryAllInstitution',{
    method: 'POST',
    body: params,
  })
}
export async function getInstitution(params) {
  return request('/api/sysAnno/InstitutionManageParent',{
    method: 'POST',
    body: params,
  })
}
export async function getSubInstitution(params) {
  return request('/api/sysAnno/InstitutionManageSub',{
    method: 'POST',
    body: params,
  })
}
export async function register(params) {
  return request('/api/sysAnno/register',{
    method: 'POST',
    body: params,
  })
}
