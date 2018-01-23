import { queryAllRole, queryUser, removeUser, addUser, updateUser } from '../services/system';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
export default {
  namespace: 'systemUser',

  state: {
    data: {
      list: [],
      pagination: {},
      roleList: []
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *queryAllRole({ payload }, { call, put }) {
      const response = yield call(queryAllRole, payload);
      yield put({
        type: 'save',
        payload: {
          roleList: response.data
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put(routerRedux.push('/system/user'));
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload }, { call, put }) {
      yield call(updateUser, payload);
      message.success('提交成功');
      yield put(routerRedux.push('/system/user'));
    },
    *saveUser({ payload }, { call, put }) {
      yield put({
        type: 'saveUserInfo',
        payload: payload,
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
    saveUserInfo(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, state }) => {
        if(pathname ==="/system/user/edit"){
          dispatch({
            type:'saveUser',
            payload: state
          })
        }
        // if (pathname === url) {
        //   dispatch({ type: 'fetch', payload: { current: 1, size: 20, ...query } });
        // }
      });
    },
  },
};
