import { defineMock } from 'vite-plugin-mock-dev-server';
import { omit, random } from 'lodash-es';
// @ts-expect-error
import type { Connect } from 'vite';
import { userList } from './userList';
import { UserStatus } from '../../src/enum/userStatus.enum';
import type { MockRequest, MockResponse } from '../types';
import type { UserItem } from '../../src/interface/user.interface';

/* 账号登录 */
export default defineMock([
  {
    method: 'POST',
    url: '/api/user/login',
    response(req: MockRequest, res: MockResponse, next: Connect.NextFunction): void {
      const { username, password }: { username: string; password: string } = JSON.parse(req.body);

      // 检查用户名
      const userItem: UserItem | undefined = userList.find((o: UserItem): boolean => o.username === username);

      if (!userItem) {
        res.write(JSON.stringify({
          code: 0,
          errorMessage: '账户不存在'
        }));
        res.end();

        return;
      }

      // 检查密码
      if (password !== userItem.password) {
        res.write(JSON.stringify({
          code: 0,
          errorMessage: '密码错误'
        }));
        res.end();

        return;
      }

      // 检查权限
      if (userItem.status !== UserStatus.Available) {
        res.write(JSON.stringify({
          code: 0,
          errorMessage: '账户被停用'
        }));
        res.end();

        return;
      }

      // 登录成功
      res.write(JSON.stringify({
        code: 1,
        data: {
          userInfo: omit(userItem, ['password']),
          token: `${ userItem.uid }_${ random(10000, 99999) }`
        }
      }));
      res.end();
    }
  }
]);