import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { add, addAi, query,queryAI, queryDetail, update, updateStatus, remove } from '../services/match';
import { queryDict } from '../services/api';
import { getInstitution, getSubInstitution } from '../services/register'

export default {
  namespace: 'match',

  state: {
    step:{
      modelName:"",
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
    data:{
      data:[]
    },
    ai:{

    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchAI({ payload }, { call, put }) {
      const response = yield call(queryAI, payload);
      yield put({
        type: 'saveAI',
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
    *updateStatus({ payload, callback }, { call, put }) {
      const response = yield call(updateStatus, payload);
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
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      const step = {
        modelName:response.data.modeName,
        ...JSON.parse(response.data.modeJson)
      }
      console.log(step,'step')
      yield put({
        type: 'saveDetail',
        payload: step,
      });
      console.log(response)
      // yield put(routerRedux.push('/match/Detail'));
    },
    // *fetchReview({payload}, { call, put }) {
    //   const response = yield call(queryDetail, payload);
    //
    //   console.log(step,"step")
    //   yield put({
    //     type: 'saveDetail',
    //     payload: response.data,
    //   });
    //   yield put(routerRedux.push('/match/Review'));
    // },
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
    *submitStepForm({ payload }, { call, put, select }) {
      const modelName = payload.modelName;
      delete payload['modelName']
      const response = yield call(add, {
        modelName:modelName,
        modelJson:JSON.stringify(payload),
      });
      if (response.code === 0) {
        message.success('新增成功');
      } else {
        message.error(response.msg)
        return
      }

      yield put(routerRedux.push('/match'));
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveAI(state, action) {
      return {
        ...state,
        AI: action.payload,
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
          modelName:payload.modelName,
          loanDemand:{
            loanType:payload.loanType,
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
    saveStep6FormData(state, { payload }) {
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
        step: action.payload,
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
