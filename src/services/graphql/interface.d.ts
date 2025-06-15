import type { GraphQLResponseData } from '../../interface/response.interface';
import type { UserItem } from '../../interface/user.interface';

// 登录
export interface UserLoginResponseData {
  userInfo: UserItem;
  token: string;
}

export type UserLoginResponse = GraphQLResponseData<{
  user: {
    login: UserLoginResponseData;
  };
}>;

// 获取当前账号的信息
export type UserInfoResponse = GraphQLResponseData<{
  user: {
    info: UserItem;
  };
}>;