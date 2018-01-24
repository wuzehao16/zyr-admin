import { message } from 'antd';
import { queryRole, removeRole, addRole, updateRole, queryMenu } from '../services/system';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'systemRole',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchMenu({ payload }, { call, put }) {
      const response = yield call(queryMenu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put(routerRedux.push('/system/role'));
      if (callback) callback();
    },
    *update({ payload }, { call, put }) {
      yield call(updateRole, payload);
      message.success('提交成功');
      yield put(routerRedux.push('/system/role'));
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
