import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '../services/api';
import { msgPhone, validataPhone, msgEmail, getInstitution, getSubInstitution, getInstitutionType, register } from '../services/register'
import { queryDict } from '../services/api'
export default {
  namespace: 'register',

  state: {
    step: {
      userPhone: '',
      prefix: '86',
      isEmailRegister: '',
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStep1Form({ payload }, { call, put }) {
      console.log(payload)
      const response = yield call(msgPhone, payload);
      if(response.code == 0){
        message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
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
      } else{
        message.error(response.msg);
      }
    },
    *getEmailCaptcha({ payload, callback }, { call, put }) {
      const response = yield call(msgEmail, payload);
      if(response.code == 0){
        message.success('发送成功');
        if (callback) callback();
      } else{
        message.error(response.msg);
      }
    },
    *queryCity({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveStepFormData',
        payload:{
          city : response.data
        },
      });
    },
    *getInstitutionType({ payload }, { call, put }) {
      const response = yield call(getInstitutionType, payload);
      yield put({
        type: 'saveStepFormData',
        payload:{
          institutionTypeList : response.data
        },
      });
    },
    *getInstitution({ payload }, { call, put }) {
      const response = yield call(getInstitution, payload);
      yield put({
        type: 'saveStepFormData',
        payload:{
          institutionList : response.data
        },
      });
    },
    *getSubInstitution({ payload }, { call, put }) {
      const response = yield call(getSubInstitution, payload);
      yield put({
        type: 'saveStepFormData',
        payload:{
          subInstitutionList : response.data
        },
      });
    },
    *submitStep2Form({ payload }, { call, put }) {
      const response = yield call(validataPhone, payload);
      if(response.code == 0){
        // message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
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
      const response = yield call(register, payload);
      if(response.code == 0){
        // message.success('发送成功');
      } else{
        message.error(response.msg);
        return
      }
      yield put(routerRedux.push('/user/register-result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
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
