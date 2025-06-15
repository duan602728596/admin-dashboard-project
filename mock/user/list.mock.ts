import { defineMock } from 'vite-plugin-mock-dev-server';
import { omit } from 'lodash-es';
// @ts-expect-error
import type { Connect } from 'vite';
import { userList } from './userList';
import type { MockRequest, MockResponse } from '../types';
import type { UserItem } from '../../src/interface/user.interface';

/* 请求账户的列表 */
export default defineMock([
  {
    method: 'POST',
    url: '/api/users/list',
    response(req: MockRequest, res: MockResponse, next: Connect.NextFunction): void {
      res.write(JSON.stringify({
        code: 1,
        data: userList.map((o: UserItem): UserItem => omit(o, ['password']))
      }));
      res.end();
    }
  }
]);