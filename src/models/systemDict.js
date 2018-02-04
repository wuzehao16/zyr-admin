import { message } from 'antd';
import { queryDict, removeDict, addDict, updateDict } from '../services/system';

export default {
  namespace: 'systemDict',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      console.log(response, "dict response")
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addDict, payload);
      if (response.code !== 0) {
        message.error(response.msg);
        return
      }
      const list = yield call(queryDict, payload);
      yield put({
        type: 'save',
        payload: list,
      });

      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateDict, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDict, payload);
      if (response.code === 0) {
        message.success('删除成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
