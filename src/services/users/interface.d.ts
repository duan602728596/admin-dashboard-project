import type { CoreResponseData } from '../../interface/response.interface';
import type { UserItem } from '../../interface/user.interface';

// 登录
export interface UserLoginResponseData {
  userInfo: UserItem;
  token: string;
}

export type UserLoginResponse = CoreResponseData<UserLoginResponseData>;

// 刷新用户信息
export type UserInfoResponse = CoreResponseData<UserItem>;

// 用户列表
export type UserListResponse = CoreResponseData<Array<UserItem>>;