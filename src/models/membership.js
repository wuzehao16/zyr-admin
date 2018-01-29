import { message } from 'antd';
import { query, remove, add, update } from '../services/membership';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'membership',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    menuList:{},
    item: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      const list = yield call(query, payload);
      yield put({
        type: 'save',
        payload: list,
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (response.code === 0) {
        message.success('新建成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/membership'));
      if (callback) callback();
    },
    *update({ payload }, { call, put }) {
      yield call(update, payload);
      message.success('提交成功');
      yield put(routerRedux.push('/membership'));
    },
    *saveItem({payload}, { call, put }) {
      yield put({
        type: 'saveItemInfo',
        payload: payload,
      });
      yield put(routerRedux.push('/membership/edit'));

    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveItemInfo(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
  },
};
