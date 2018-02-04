import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { add, query, querySysInfo, queryDetail, update, queryDict, upPMIState, remove } from '../services/info';
import { getInstitution, getSubInstitution } from '../services/register'

export default {
  namespace: 'info',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    item: {},
    infoType:[],
    mesType:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSysInfo({ payload }, { call, put }) {
      const response = yield call(querySysInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchInfoType({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          infoType: response.data
        },
      });
    },
    *fetchNoticeType({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          mesType: response.data
        },
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
      yield put(routerRedux.push('/info/notification'));
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
      yield put(routerRedux.push('/info/notification'));
    },
    *upPMIState({ payload, callback }, { call, put }) {
      const response = yield call(upPMIState, payload);
      if(response.code === 0){
        message.success('提交成功');
        yield put(routerRedux.push('/info/notification'));
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
      yield put(routerRedux.push('/info/notification/edit'));
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/info/notification/Detail'));
    },
    *fetchReview({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/info/notification/Review'));
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if (response.code === 0) {
        message.success('删除成功');
      } else {
        message.error(response.msg)
        return
      }
      const list = yield call(query);
      yield put({
        type: 'save',
        payload: list,
      });
      if (callback) callback();
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
    saveDetail(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
  },
};
