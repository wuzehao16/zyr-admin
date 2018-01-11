import { stringify } from 'qs';
import request from '../utils/request';

/**
 * 内容管理
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function queryContent(params) {
  return request(`/api/content?${stringify(params)}`);
}

export async function removeContent(params) {
  return request('/api/content', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addContent(params) {
  return request('/api/content', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
