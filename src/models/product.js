import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { add, query, queryDetail, update, updateAprovalStatus, updateShelvesStatus, queryManage } from '../services/product';
import { queryDict } from '../services/api';
import { getInstitution, getSubInstitution } from '../services/register'

export default {
  namespace: 'product',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    item: {},
    city: [],
    intRange: [],
    audit: [],
    institutionType: [],
    step:{},
    prodCategory: [],
    propCategory: [],
    cusCategory: [],
    repMethod: [],
    prodFeatures: [],
    institutionList:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchInstitutionType({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveInstitutionType',
        payload: response.data,
      });
    },
    *fetchAudit({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveAudit',
        payload: response.data,
      });
    },
    *fetchCity({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveCity',
        payload: response.data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (response.code === 0) {
        message.success('新建成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/product'));
      if (callback) callback();
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      if (response.code === 0) {
        message.success('提交成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/product'));
    },
    *updateShelvesStatus({ payload, callback }, { call, put }) {
      const response = yield call(updateShelvesStatus, payload);
      if(response.code === 0){
        message.success('提交成功');
        yield put(routerRedux.push('/product'));
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
      yield put(routerRedux.push('/product/edit'));
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/product/Detail'));
    },
    *fetchReview({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/product/Review'));
    },
    *getInstitution({ payload }, { call, put }) {
      const response = yield call(queryManage, payload);
      yield put({
        type: 'saveThing',
        payload:{
          institutionList : response.data
        },
      });
    },
    *getSubInstitution({ payload }, { call, put }) {
      const response = yield call(getSubInstitution, payload);
      yield put({
        type: 'saveThing',
        payload:{
          subInstitutionList : response.data
        },
      });
    },
    *fetchProdCategory({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          prodCategory: response.data
        },
      });
    },
    *fetchIntRange({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          intRange: response.data
        },
      });
    },
    *fetchPropCategory({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          propCategory: response.data
        },
      });
    },
    *fetchCusCategory({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          cusCategory: response.data
        },
      });
    },
    *fetchRepMethod({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          repMethod: response.data
        },
      });
    },
    *fetchProdFeatures({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          prodFeatures: response.data
        },
      });
    },
    *fetchCusCategory({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          cusCategory: response.data
        },
      });
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(add, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/product'));
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    saveThing(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveCity(state, action) {
      return {
        ...state,
        city: action.payload,
      };
    },
    saveAudit(state, action) {
      return {
        ...state,
        audit: action.payload,
      };
    },
    saveInstitutionType(state, action) {
      return {
        ...state,
        institutionType: action.payload,
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
