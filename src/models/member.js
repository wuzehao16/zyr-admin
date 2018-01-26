import { message } from 'antd';
import { query, queryDetail, update, updatePassword } from '../services/member';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'member',

  state: {
    data: {
      list: [],
      pagination: {},
    },
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
    *update({ payload }, { call, put }) {
      yield call(update, payload);
      message.success('提交成功');
      yield put(routerRedux.push('/member'));
    },
    *updatePassword({ payload }, { call, put }) {
      yield call(updatePassword, payload);
      message.success('提交成功');
      yield put(routerRedux.push('/member'));
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      console.log(response);
      yield put({
        type: 'saveDetail',
        payload: response,
      });
      yield put(routerRedux.push('/member/edit'));

    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
  },
};
