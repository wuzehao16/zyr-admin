import { msgPhone, msgEmail, resetPassword } from '../services/resetPassword';
import { message } from 'antd';
export default {
  namespace: 'resetPassword',

  state: {
    status: undefined,
  },

  effects: {
    *getEmailCaptcha({ payload }, { call, put }) {
      const response = yield call(msgEmail, payload);
      if(response.code == 0){
        message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
    },
    *getPhoneCaptcha({ payload }, { call, put }) {
      const response = yield call(msgPhone, payload);
      if(response.code == 0){
        message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
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
      if(response.code == 0){
        message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
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
