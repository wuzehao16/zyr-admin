import { msgPhone, msgEmail, resetPassword } from '../services/resetPassword';

export default {
  namespace: 'resetPassword',

  state: {
    status: undefined,
  },

  effects: {
    *getEmailCaptcha({ payload }, { call, put }) {
      const response = yield call(msgEmail, payload);
    },
    *getPhoneCaptcha({ payload }, { call, put }) {
      const response = yield call(msgPhone, payload);
      console.log(2)
    },
    *savePhone({ payload }, { call, put }) {
      yield put({
        type: 'saveStepFormData',
        ...payload,
      });

    },
    *saveEmail({ payload }, { call, put }) {
      yield put({
        type: 'saveStepFormData',
        ...payload,
      });
    },
    *reset({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);
    },
  },
  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
  },
};
