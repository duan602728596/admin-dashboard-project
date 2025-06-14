const userTokenKey: string = 'TOKEN';

/* 读取用户的信息 */
export function getUserToken(): string | null {
  return localStorage.getItem(userTokenKey);
}

/* 设置用户的token */
export function setUserToken(userToken: string): void {
  localStorage.setItem(userTokenKey, userToken);
}