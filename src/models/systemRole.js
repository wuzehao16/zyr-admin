import { message } from 'antd';
import { queryRole, removeRole, addRole, updateRole, queryMenu } from '../services/system';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'systemRole',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    menuList:[],
    item: {}
  },

  effects: {
    *fetchMenu({ payload }, { call, put }) {
      const response = yield call(queryMenu, payload);
      yield put({
        type: 'saveMenu',
        payload: response.data,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRole, payload);
      if (response.code === 0) {
        message.success('删除成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put({
        type: 'save',
        payload: response,
      });
      const list = yield call(queryRole);
      yield put({
        type: 'save',
        payload: list,
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload);
      if (response.code === 0) {
        message.success('新建成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/system/role'));
      if (callback) callback();
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateRole, payload);
      if (response.code === 0) {
        message.success('提交成功');
      } else {
        message.error(response.msg)
        return
      }
      yield put(routerRedux.push('/system/role'));
    },
    *saveRole({payload}, { call, put }) {
      yield put({
        type: 'saveRoleInfo',
        payload: payload,
      });
      const response = yield call(queryMenu);
      yield put({
        type: 'saveMenu',
        payload: response.data,
      });
      yield put(routerRedux.push('/system/role/edit'));

    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveMenu(state, action) {
      return {
        ...state,
        menuList: action.payload,
      };
    },
    saveRoleInfo(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, state }) => {
  //       if(pathname ==="/system/role/edit"){
  //         dispatch({
  //           type:'saveRole',
  //           payload: state
  //         })
  //       }
  //     });
  //   },
  // },
};
