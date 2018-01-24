import { message } from 'antd';
import { queryMenu, removeMenu, addMenu, updateMenu } from '../services/system';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'systemMenu',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMenu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeMenu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addMenu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put(routerRedux.push('/system/menu'));
      if (callback) callback();
    },
    *update({ payload }, { call, put }) {
      yield call(updateMenu, payload);
      message.success('提交成功');
      yield put(routerRedux.push('/system/menu'));
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
