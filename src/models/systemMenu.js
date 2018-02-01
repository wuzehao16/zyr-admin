import { message } from 'antd';
import { queryMenu, removeMenu, addMenu, updateMenu } from '../services/system';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'systemMenu',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    item: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMenu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeMenu, payload);
      if (response.code === 0 ) {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      const list = yield call(queryMenu, payload);
      yield put({
        type: 'save',
        payload: list,
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addMenu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (response.code === 0 ) {
        message.success('新建成功');
      } else {
        message.error(response.msg);
        return
      }
      yield put(routerRedux.push('/system/menu'));
      if (callback) callback();
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateMenu, payload);
      if (response.code === 0 ) {
        message.success('修改成功');
      } else {
        message.error(response.msg);
        return
      }
      yield put(routerRedux.push('/system/menu'));
    },
    *saveMenu({payload}, { call, put }) {
      yield put({
        type: 'saveMenuInfo',
        payload: payload,
      });
      // const response = yield call(queryMenu, payload);
      // yield put({
      //   type: 'saveMenu',
      //   payload: response.data,
      // });
      yield put(routerRedux.push('/system/menu/edit'));

    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveMenuInfo(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
  },
};
