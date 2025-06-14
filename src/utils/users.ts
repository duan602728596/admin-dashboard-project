import type { UserItem } from '../interface/user.interface';

const userTokenKey: string = 'TOKEN';

/* 读取用户的信息 */
export function getUserToken(): string | null {
  return localStorage.getItem(userTokenKey);
}

/* 设置用户的token */
export function setUserToken(userToken: string): void {
  localStorage.setItem(userTokenKey, userToken);
}

const userInfoKey: string = 'USER_INFO';

/* 读取用户的信息 */
export function getUserInfo(): UserItem | null {
  const userInfoStr: string | null = localStorage.getItem(userInfoKey);

  if (userInfoStr) return JSON.parse(userInfoStr);

  return null;
}

/* 设置用户的信息 */
export function setUseInfo(userItem: UserItem): void {
  localStorage.setItem(userInfoKey, JSON.stringify(userItem));
}