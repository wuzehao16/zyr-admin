import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { queryContent,queryContentDetail, removeContent, addContent, queryColumn, removeColumn, addColumn,editContent,editColumn } from '../services/content';
import { queryDict } from '../services/api'
export default {
  namespace: 'content',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    column:{},
    columnType:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryContent, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchColumn({ payload }, { call, put }) {
      const response = yield call(queryColumn, payload);
      yield put({
        type: 'queryColumn',
        payload: response,
      });
    },
    *fetchColumnType({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      yield put({
        type: 'saveThing',
        payload: {
          columnType: response.data
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addContent, payload);
      if (response.code === 0) {
        message.success('新建成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/content/column'));
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(removeContent, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
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
    saveThing(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    queryColumn(state, action) {
      return {
        ...state,
        column: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
