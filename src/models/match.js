import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { add, addAi, query, queryDetail, update, upAdsState, remove } from '../services/match';
import { queryDict } from '../services/api';
import { getInstitution, getSubInstitution } from '../services/register'

export default {
  namespace: 'match',

  state: {
    step:{
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
    },
    data: {
      data: [],
      pagination: {},
    },
    item: {},
    matchType:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
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
      yield put(routerRedux.push('/match'));
      if (callback) callback();
    },
    *addAi({ payload, callback }, { call, put }) {
      const response = yield call(addAi, payload);
      if (response.code === 0) {
        message.success('新建成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/match'));
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
      yield put(routerRedux.push('/match'));
    },
    *upAdsState({ payload, callback }, { call, put }) {
      const response = yield call(upAdsState, payload);
      if(response.code === 0){
        message.success('提交成功');
        yield put({
          type: 'updateShelves',
          payload: payload,
        });
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
      yield put(routerRedux.push('/match/edit'));
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/match/Detail'));
    },
    *fetchReview({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data,
      });
      yield put(routerRedux.push('/match/Review'));
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if (response.code === 0) {
        message.success('删除成功');
        yield put({
          type: 'removeAds',
          payload: payload
        })
      } else {
        message.error(response.msg)
        return
      }
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
    updateShelves(state, action) {
      const updateAds = action.payload;
      const newList = state.data.data.map(item => item.matchId == updateAds.matchId ? {...item,...updateAds} : item);
      return {
        ...state,
        data:{
          data: newList
        }
      }
    },
    saveStep1FormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          loanDemand:{
            ...payload,
          }
        },
      };
    },
    saveStep2FormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          basicInformation:{
            ...payload,
          }
        },
      };
    },
    saveStep3FormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          creditInformation:{
            ...payload,
          }
        },
      };
    },
    saveStep4FormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          income:{
            ...payload,
          }
        },
      };
    },
    saveStep5FormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          assets:{
            ...payload,
          }
        },
      };
    },
    saveStep5FormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          capitalDebtSituation:{
            ...payload,
          }
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
    removeAds(state, action) {
      const newList = state.data.data.filter(item => item.matchId != action.payload.matchId);
      return{
        ...state,
        data:{
          data: newList
        }
      }
    }
  },
};
