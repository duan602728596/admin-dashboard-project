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