import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { add, query, queryDetail, update, upAdsState, remove } from '../services/ads';
import { queryDict } from '../services/api';
import { getInstitution, getSubInstitution } from '../services/register'

export default {
  namespace: 'ads',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    item: {},
    adsType:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchAdsType({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          adsType: response.data
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
      yield put(routerRedux.push('/ads'));
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
      yield put(routerRedux.push('/ads'));
    },
    *upAdsState({ payload, callback }, { call, put }) {
      const response = yield call(upAdsState, payload);
      if(response.code === 0){
        message.success('提交成功');
        const list = yield call(query);
        yield put({
          type: 'save',
          payload: list,
        });
        yield put(routerRedux.push('/ads'));
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
      yield put(routerRedux.push('/ads/edit'));
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/ads/Detail'));
    },
    *fetchReview({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/ads/Review'));
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
