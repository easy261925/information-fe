import type { Effect, Reducer } from 'umi';
import { query as queryUsers, getUserInfoService } from '@/services/user';
import { setAuthority } from '@/utils/authority';

export type CurrentUser = {
  userName?: string;
  loginName?: string;
  avatar?: string;
  username?: string;
  nickname?: string;
  createTime?: string;
  gender?: string;
  loginIp?: string;
  loginTime?: string;
  phone?: string;
  userType?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  id?: string;
  userRoles?: number[];
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
  serverAddress?: string;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
    save: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
    serverAddress: '',
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const { success, data, message } = yield call(getUserInfoService);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            serverAddress: data.serverAddress,
          },
        });
        setAuthority(data.authority);
        yield put({
          type: 'saveCurrentUser',
          payload: data.user,
        });
      } else {
        setAuthority([]);
        yield put({
          type: 'saveCurrentUser',
          payload: null,
        });
      }
      return { success, data, message };
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
