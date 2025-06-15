import { create, type UseBoundStore, type StoreApi } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { UserItem } from '../interface/user.interface';

interface UserInfoInitialState {
  userInfo: UserItem | null;
}

interface UserInfoActions {
  setUserInfo(payload: UserItem | null): void;
}

export type UserInfoStore = UserInfoInitialState & UserInfoActions;
type ImmerSet = (fn: (state: UserInfoStore) => void) => void;

/* 记录当前登录的用户信息 */
export const useUserInfoStore: UseBoundStore<StoreApi<UserInfoStore>> = create<UserInfoStore>()(immer((set: ImmerSet): UserInfoStore => ({
  userInfo: null, // 用户信息

  // 设置用户信息
  setUserInfo: (payload: UserItem | null): void => set((state: UserInfoStore): void => {
    state.userInfo = payload;
  })
})));