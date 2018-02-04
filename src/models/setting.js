import { message } from 'antd';
import { queryOldPhoneCaptcha, queryNewPhoneCaptcha, queryOldEmailCaptcha, queryNewEmailCaptcha, updatePassword, updatePhone, updateEmail  } from '../services/setting';

export default {
  namespace: 'setting',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *queryOldPhoneCaptcha({ payload }, { call, put }) {
      const response = yield call(queryOldPhoneCaptcha, payload);
    },
    *queryNewPhoneCaptcha({ payload }, { call, put }) {
      const response = yield call(queryNewPhoneCaptcha, payload);
    },
    *queryOldEmailCaptcha({ payload }, { call, put }) {
      const response = yield call(queryOldEmailCaptcha, payload);
    },
    *queryNewEmailCaptcha({ payload }, { call, put }) {
      const response = yield call(queryOldEmailCaptcha, payload);
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
  },
};
