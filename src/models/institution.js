import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { add, query, queryDetail, update, updatePassword, queryDict, review } from '../services/institution';
import { getInstitution, getSubInstitution } from '../services/register'

export default {
  namespace: 'institution',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    item: {},
    city: [],
    audit: [],
    institutionType: [],
    institutionList:[],
    subInstitutionList:[]
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
      yield put(routerRedux.push('/institution'));
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
      yield put(routerRedux.push('/institution'));
    },
    *review({ payload }, { call, put }) {
      const response = yield call(review, payload);
      if (response.code === 0) {
        message.success('提交成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/institution'));
    },
    *updatePassword({ payload, callback }, { call, put }) {
      const response = yield call(updatePassword, payload);
      if(response.code === 0){
        message.success('重置密码成功');
        yield put(routerRedux.push('/institution'));
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
        payload: response.data && response.data[0],
      });
      yield put(routerRedux.push('/institution/edit'));
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data && response.data[0],
      });
      yield put(routerRedux.push('/institution/Detail'));
    },
    *fetchReview({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data && response.data[0],
      });
      yield put(routerRedux.push('/institution/Review'));
    },
    *getInstitution({ payload }, { call, put }) {
      const response = yield call(getInstitution, payload);
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
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
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
