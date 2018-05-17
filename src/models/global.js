import { isUrl, formatter } from '../utils/utils';
import { queryNotices, queryMenus } from '../services/api';
import store from '../index';


export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    menus: [],
  },

  effects: {
    *fetchMenus(_, { call, put }) {
      const response = yield call(queryMenus);
      const { dispatch } = store;
      console.log(1)
      try {
        if (response.code !== 0) {
          dispatch({
            type: 'login/logout',
          });
          return;
        }
      } catch (e) {
        dispatch({
          type: 'login/logout',
        });
        window.location.reload();
      }
      const menus = formatter(response.data.children)
      yield put({
        type: 'saveMenus',
        payload: menus,
      });
    },
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearMenus(_,{ put }) {
      const list = [];
      yield put({
        type: 'saveclearMenus',
        payload: list,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveMenus(state, { payload }) {
      return {
        ...state,
        menus: payload,
      };
    },
    saveclearMenus(state, { payload }) {
      return {
        ...state,
        menus: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
