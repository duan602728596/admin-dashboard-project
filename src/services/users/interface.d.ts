import type { CoreResponseData } from '../../interface/response.interface';
import type { UserItem } from '../../interface/user.interface';

// 登录
export interface UserLoginResponseData {
  userInfo: UserItem;
  token: string;
}

export type UserLoginResponse = CoreResponseData<UserLoginResponseData>;

// 用户列表
export type UserListResponse = CoreResponseData<UserItem>;