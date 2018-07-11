import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { msgPhone, msgEmail, resetPassword } from '../services/resetPassword';

export default {
  namespace: 'resetPassword',

  state: {
    status: undefined,
  },

  effects: {
    *getEmailCaptcha({ payload }, { call }) {
      const response = yield call(msgEmail, payload);
      if (response.code === 0) {
        message.success('发送成功');
      } else {
        message.error(response.msg);
      }
    },
    *getPhoneCaptcha({ payload }, { call }) {
      const response = yield call(msgPhone, payload);
      if (response.code === 0) {
        message.success('发送成功');
      } else {
        message.error(response.msg);
      }
    },
    *savePhone({ payload }, { put }) {
      yield put({
        type: 'saveStepFormData',
        ...payload,
      });
    },
    *saveEmail({ payload }, { put }) {
      yield put({
        type: 'saveStepFormData',
        ...payload,
      });
    },
    *reset({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);
      if (response.code === 0) {
        // message.success('发送成功');
      } else {
        message.error(response.msg);
        return;
      }
      yield put(routerRedux.push('/user/login'));
    },
  },
  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
