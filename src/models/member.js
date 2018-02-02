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
      const response = yield call(update, payload);
      if (response.code === 0) {
        message.success('提交成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/member'));
    },
    *updatePassword({ payload, callback }, { call, put }) {
      const response = yield call(updatePassword, payload);
      console.log(callback)
      if(response.code === 0){
        message.success('重置密码成功');
        yield put(routerRedux.push('/member'));
      } else {
        message.error(response.msg);
        return
      }
      if (callback) callback();
    },
    *fetchEdit({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/member/edit'));
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/member/Detail'));
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
