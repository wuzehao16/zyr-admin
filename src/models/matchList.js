import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { query, queryDetail, queryByInstitution, updateOrderState} from '../services/matchList';
import { queryDict } from '../services/api';
import { getInstitution, getSubInstitution } from '../services/register'

export default {
  namespace: 'matchlist',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    item: {
      objectUserJson:{
        //贷款需求
        loanDemand: null,
        //基本信息
        basicInformation: null,
        //征信信息
        creditInformation: null,
        // 工作收入
        income: null,
        // 资产状况
        assets: null,
        //资产负债
        capitalDebtSituation: null,
      }
    },
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
        yield put(routerRedux.push('/matchList'));
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
