import { defineMock } from 'vite-plugin-mock-dev-server';
import { omit } from 'lodash-es';
// @ts-expect-error
import type { Connect } from 'vite';
import { userList } from './userList';
import type { MockRequest, MockResponse } from '../types';
import type { UserItem } from '../../src/interface/user.interface';

/* 根据token请求账户信息 */
export default defineMock([
  {
    method: 'GET',
    url: '/api/user/info',
    response(req: MockRequest, res: MockResponse, next: Connect.NextFunction): void {
      const token: string | undefined = req.headers.token;

      if (!token) {
        res.write(JSON.stringify({
          code: 0,
          errorMessage: '需要先登录'
        }));
        res.end();

        return;
      }

      // 模拟登录时，token的第一部分是uid，用来模拟请求用户信息
      // 实际使用时要用redis来保存token
      const [uid]: Array<string> = token.split('_');
      const userItem: UserItem | undefined = userList.find((o: UserItem): boolean => o.uid === uid);

      if (!userItem) {
        res.write(JSON.stringify({
          code: 0,
          errorMessage: '账号不存在'
        }));
        res.end();

        return;
      }

      res.write(JSON.stringify({
        code: 1,
        data: omit(userItem, ['password'])
      }));
      res.end();
    }
  }
]);