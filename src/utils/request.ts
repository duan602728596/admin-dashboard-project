import { getUserToken } from './userToken';

export interface RequestOptions {
  url: string;
  method?: string;
  body?: Record<string, any>;
  useToken?: boolean;
}

/**
 * 一个简易的request实现
 * TODO: 添加超时处理、登录过期处理
 */
export async function request<T>(requestOptions: RequestOptions): Promise<T> {
  const headers: Headers = new Headers();

  if (requestOptions.useToken ?? true) {
    const token: string | null = getUserToken();

    token && (headers.append('Token', token));
  }

  const res: Response = await fetch(requestOptions.url, {
    method: requestOptions.method ?? 'GET',
    headers,
    body: requestOptions.body ? JSON.stringify(requestOptions.body) : undefined
  });

  return await res.json();
}