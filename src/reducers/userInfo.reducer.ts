import { createSlice, type Slice, type PayloadAction, type CaseReducer, type CaseReducerActions } from '@reduxjs/toolkit';
import type { UserItem } from '../interface/user.interface';

/* 记录当前登录的用户信息 */
export interface UserInfoInitialState {
  userInfo: UserItem | null;
}

type SliceReducers = {
  setUserInfo: CaseReducer<UserInfoInitialState, PayloadAction<UserItem | null>>;
};

type SliceSelectors = {
  userInfo(state: UserInfoInitialState): UserItem | null;
};

const sliceName: 'userInfo' = 'userInfo';
const { actions, reducer, selectors: selectorsObject }: Slice<UserInfoInitialState, SliceReducers, typeof sliceName, typeof sliceName, SliceSelectors> = createSlice({
  name: sliceName,
  initialState: {
    userInfo: null
  },
  reducers: {
    // 设置userInfo
    setUserInfo(state: UserInfoInitialState, action: PayloadAction<UserItem | null>): void {
      state.userInfo = action.payload;
    }
  },
  selectors: {
    // 读取用户信息
    userInfo: (state: UserInfoInitialState): UserItem | null => state.userInfo
  }
});

export const { setUserInfo }: CaseReducerActions<SliceReducers, typeof sliceName> = actions;
export { selectorsObject };
export default { [sliceName]: reducer };