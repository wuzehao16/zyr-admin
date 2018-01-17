import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '../services/api';
import { msgPhone, validataPhone, msgEmail, getInstitution,getSubInstitution, register } from '../services/register'
export default {
  namespace: 'register',

  state: {
    step: {
      userPhone: '',
      prefix: '86',
      fileList: [],
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStep1Form({ payload }, { call, put }) {
      console.log(payload)
      // yield call(msgPhone, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/user/register/step2'));
    },
    *getPhoneCaptcha({ payload }, { call, put }) {
      const response = yield call(msgPhone, payload);
      if(response.code == 0){
        message.success('发送成功');
      }
    },
    *getEmailCaptcha({ payload }, { call, put }) {
      const response = yield call(msgEmail, payload);
      if(response.code == 0){
        message.success('发送成功');
      }
    },
    *getInstitution({ payload }, { call, put }) {
      const response = yield call(getInstitution, payload);
      yield put({
        type: 'saveStepFormData',
        payload:{
          institutionList : response
        },
      });
    },
    *getSubInstitution({ payload }, { call, put }) {
      const response = yield call(getSubInstitution, payload);
      yield put({
        type: 'saveStepFormData',
        payload:{
          subInstitutionList : response
        },
      });
    },
    *submitStep2Form({ payload }, { call, put }) {
      yield call(validataPhone, payload);
      yield put(routerRedux.push('/user/register/step3'));
    },
    *submitStep3Form({ payload }, { call, put }) {
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/user/register/step4'));
    },
    *submitStep4Form({ payload }, { call, put }) {

      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/user/register-result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
