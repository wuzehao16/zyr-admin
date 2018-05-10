import { query as queryUsers, queryCurrent } from '../services/user';
import { queryDetail } from '../services/institution';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {
      data: {},
      info:{}
    },

  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({callback}, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchDetail({payload}, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: response.data && response.data[0],
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          info: action.payload,
        },
      };
    },
  },
};
