import { request } from '../../utils/request';
import type { UserLoginResponse, UserInfoResponse } from './interface';

export type * from './interface';

/* 用户登录 */
export function requestUserLogin(username: string, password: string): Promise<UserLoginResponse> {
  return request({
    url: '/api/user/login',
    method: 'POST',
    body: { username, password }
  });
}

/* 请求用户数据 */
export function requestUserInfo(): Promise<UserInfoResponse> {
  return request({ url: '/api/user/info', method: 'GET' });
}