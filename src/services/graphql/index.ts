import type { SortOrder } from 'antd/es/table/interface';
import { request, type RequestOptions } from '../../utils/request';
import type { UserLoginResponse, UserInfoResponse, UserListResponse } from './interface';
import type { UserListSearchFormSubmitValue } from '../../interface/user.interface';

export type * from './interface';

const graphqlRequestDefaultOptions: RequestOptions = {
  url: '/api/graphql',
  method: 'POST'
};

/**
 * 用户登录
 * @param { string } username - 用户名
 * @param { string } password - 密码
 */
export function requestUserLogin(username: string, password: string): Promise<UserLoginResponse> {
  return request({
    ...graphqlRequestDefaultOptions,
    body: {
      query: /* GraphQL */`
        query($username: String!, $password: String!) {
            user {
              login(username: $username, password: $password) {
                token
                userInfo {
                  uid
                  username
                  email
                  status
                  permissions
                  birthday
                  gender
                }
              }
            }
        }
      `,
      variables: { username, password }
    }
  });
}

/* 用户信息 */
export function requestUserInfo(): Promise<UserInfoResponse> {
  return request({
    ...graphqlRequestDefaultOptions,
    body: {
      query: /* GraphQL */`
        query {
          user {
            info {
              uid
              username
              email
              status
              permissions
              birthday
              gender
            }
          }
        }
      `,
      variables: null
    }
  });
}

/**
 * 用户列表
 * @param { number } current - 分页
 * @param { UserListSearchFormSubmitValue } search - 搜索条件
 * @param { SortOrder } birthdaySortOrder - 生日的排序
 */
export function requestUserList(current: number, search: UserListSearchFormSubmitValue, birthdaySortOrder: SortOrder): Promise<UserListResponse> {
  return request({
    ...graphqlRequestDefaultOptions,
    body: {
      query: /* GraphQL */`
        query($current: Int!, $search: String!, $birthdaySortOrder: String) {
          user {
            list(current: $current, search: $search, birthdaySortOrder: $birthdaySortOrder) {
              data {
                uid
                username
                email
                status
                permissions
                birthday
                gender
              }
              pagination {
                current
                length
              }
            }
          }
        }
      `,
      variables: {
        current,
        search: JSON.stringify(search),
        birthdaySortOrder
      }
    }
  });
}