/* 定义一个响应成功的接口 */
export interface SuccessResponseData<T> {
  code: 1; // 1：响应成功
  data: T; // 返回的数据
}

/* 定义一个响应失败的接口 */
export interface ErrorResponseData {
  code: 0; // 0：响应失败
  errorMessage: string;
}

/* 定义一个通用的响应的接口 */
export type CoreResponseData<T> = SuccessResponseData<T> | ErrorResponseData;

export interface GraphQLSuccessResponseData<T> {
  data: T; // 返回的数据
}

interface GraphQLErrorItem {
  message: string;
  path: Array<string>;
}

export interface GraphQLErrorResponseData {
  errors: Array<GraphQLErrorItem>;
}

/* 定义一个通用的响应的接口 */
export type GraphQLResponseData<T> = GraphQLSuccessResponseData<T> | GraphQLErrorResponseData;