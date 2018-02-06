import { stringify } from 'qs';
import request from '../utils/request';

/**
 * 内容管理
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function queryContent(params) {
  return request(`/sys/selectContent?${stringify(params)}`);
}
export async function queryContentDetail(params) {
  return request(`/sys/viewDetailContent?${stringify(params)}`);
}
export async function removeContent(params) {
  return request('/sys/deleteContent', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}
export async function addContent(params) {
  return request('/sys/addContent', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function editContent(params) {
  return request('/sys/editContent', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function editColumn(params) {
  return request('/sys/editChannel', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
export async function queryColumn(params) {
  return request(`/sys/selectChannel?${stringify(params)}`);
}
export async function removeColumn(params) {
  return request(`sys/deleteChannel/${params.roleId}`, {
    method: 'DELETE',
  });
}
export async function addColumn(params) {
  return request('/sys/addChannel', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
