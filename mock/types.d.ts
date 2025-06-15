import type { IncomingHttpHeaders, ServerResponse, IncomingMessage } from 'node:http';
// @ts-expect-error
import type { Connect } from 'vite';
import type { GetOption, SetOption } from 'cookies';

/**
 * 扩展 request，添加额外的属性和方法
 */
interface ExtraRequest {
  query: Record<string, any>;
  refererQuery: Record<string, any>;
  body: Record<string, any>;
  params: Record<string, any>;
  headers: IncomingHttpHeaders;
  getCookie: (name: string, option?: GetOption) => string | undefined;
}

/* 定义mock的response的参数类型 */
export type MockRequest = Connect.IncomingMessage & ExtraRequest;
export type MockResponse = ServerResponse<IncomingMessage> & {
  setCookie: (name: string, value?: string | null, option?: SetOption) => void;
};

/* GraphQL的context */
export interface GraphQLContext {
  token: string | undefined;
}