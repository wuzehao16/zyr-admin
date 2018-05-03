import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { add, addAi,editAi, query,queryAI, queryDetail,queryAIDetail, update, updateStatus, remove,checkSaveFormula } from '../services/match';
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
    AI:{

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
    *fetchAIDetail({ payload }, { call, put }) {
      const response = yield call(queryAIDetail, payload);
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
    *checkSaveFormula({ payload, callback }, { call, put }) {
      const response = yield call(checkSaveFormula, payload);
      if (response.code === 0) {
      } else {
        message.error(response.msg)
        return
      }
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
    *editAi({ payload, callback }, { call, put }) {
      const response = yield call(editAi, payload);
      if (response.code === 0) {
        message.success('编辑成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/match'));
      if (callback) callback();
    },
    *update({ payload }, { call, put }) {
      const modelName = payload.modelName;
      const id = payload.id;
      const loadType = payload.loanDemand.loanType[0]
      delete payload['modelName']
      delete payload['id']
      const response = yield call(update, {
        modelName:modelName,
        loanType:loadType,
        id:id,
        modelJson:JSON.stringify(payload),
      });
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
      const loadType = payload.loanDemand.loanType[0]
      delete payload['modelName']
      const response = yield call(add, {
        modelName:modelName,
        loanType:loadType,
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
      const updateMatch = action.payload;
      console.log(updateMatch,"e")
      const newList = state.data.data;
      var a = {};
      for (var i = 0; i < newList.length; i++) {
          if (newList[i].id == updateMatch.id) {
            a =  newList.splice(i, 1)[0];
            Object.assign(a,{modeStatus:updateMatch.modelStatus})
            a.updateTime = new Date()
            break;
          }
        }
        newList.unshift(a);
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
          ...payload,
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
