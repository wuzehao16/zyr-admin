import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { query, queryDetail, queryByInstitution, updateOrderState, remove} from '../services/order';
import { queryDict } from '../services/api';
import { getInstitution, getSubInstitution } from '../services/register'

export default {
  namespace: 'order',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    item: {},
    city: [],
    repMethod:[],
    orderType:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchOrderType({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          orderType: response.data
        },
      });
    },
    *updateOrderState({ payload, callback }, { call, put }) {
      const response = yield call(updateOrderState, payload);
      if(response.code === 0){
        message.success('提交成功');
        const list = yield call(query);
        yield put({
          type: 'save',
          payload: list,
        });
        yield put(routerRedux.push('/order'));
      } else {
        message.error(response.msg);
        return
      }
      if (callback) callback();
    },
    // 还款方式
    *fetchRepMethod({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          repMethod: response.data
        },
      });
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
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
    saveCity(state, action) {
      return {
        ...state,
        city: action.payload,
      };
    },
  },
};
