import { message } from 'antd';
import { queryOldPhoneCaptcha, queryNewPhoneCaptcha, queryOldEmailCaptcha, queryNewEmailCaptcha, updatePassword, updatePhone, updateEmail  } from '../services/setting';
import { queryDetail } from '../services/institution';

export default {
  namespace: 'setting',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    item:{}
  },

  effects: {
    *queryOldPhoneCaptcha({ payload, callback }, { call, put }) {
      const response = yield call(queryOldPhoneCaptcha, payload);
      if (response.code === 0) {
        message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
      if (callback) callback();
    },
    *queryNewPhoneCaptcha({ payload, callback }, { call, put }) {
      const response = yield call(queryNewPhoneCaptcha, payload);
      if (response.code === 0) {
        message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
      if (callback) callback();
    },
    *queryOldEmailCaptcha({ payload, callback }, { call, put }) {
      const response = yield call(queryOldEmailCaptcha, payload);
      if (response.code === 0) {
        message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
      if (callback) callback();
    },
    *queryNewEmailCaptcha({ payload, callback }, { call, put }) {
      const response = yield call(queryNewEmailCaptcha, payload);
      if (response.code === 0) {
        message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
      if (callback) callback();
    },
    *updatePassword({ payload, callback }, { call, put }) {
      const response = yield call(updatePassword, payload);
      if (response.code === 0) {
        message.success('更新成功');
      } else {
        message.error(response.msg)
        return
      }
      if (callback) callback();
    },
    *updatePhone({ payload, callback }, { call, put }) {
      const response = yield call(updatePhone, payload);
      if (response.code === 0) {
        message.success('更新成功');
      } else {
        message.error(response.msg)
        return
      }
      if (callback) callback();
    },
    *updateEmail({ payload, callback }, { call, put }) {
      const response = yield call(updateEmail, payload);
      if (response.code === 0) {
        message.success('更新成功');
      } else {
        message.error(response.msg)
        return
      }
      if (callback) callback();
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data && response.data[0],
      });
    },
  },
  reducers:{
    saveDetail(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
  }
};
