import { omit, random } from 'lodash-es';
import { userList } from '../user/userList';
import { UserStatus } from '../../src/enum/userStatus.enum';
import type { UserItem } from '../../src/interface/user.interface';
import type { UserLoginResponseData } from '../../src/services/graphql';
import type { GraphQLContext } from '../types';

interface GraphqlRootValue {
  user: {
    login(args: { username: string; password: string }): UserLoginResponseData;
    info(args: null, context: GraphQLContext): Omit<UserItem, 'password'>;
  };
}

export const graphQLRootValue: GraphqlRootValue = {
  user: {
    // 用户登录
    login(variableValues: { username: string; password: string }): UserLoginResponseData {
      const { username, password }: { username: string; password: string } = variableValues;

      // 检查用户名
      const userItem: UserItem | undefined = userList.find((o: UserItem): boolean => o.username === username);

      if (!userItem) throw new Error('账户不存在');

      // 检查密码
      if (password !== userItem.password) throw new Error('密码错误');

      // 检查账户状态
      if (userItem.status !== UserStatus.Available) throw new Error('账户被停用');

      return {
        userInfo: omit(userItem, ['password']),
        token: `${ userItem.uid }_${ random(10000, 99999) }`
      };
    },

    // 用户信息
    info(variableValues: null, contextValues: GraphQLContext): Omit<UserItem, 'password'> {
      if (!contextValues.token) throw new Error('需要先登录');

      // 模拟登录时，token的第一部分是uid，用来模拟请求用户信息
      // 实际使用时要用redis来保存token
      const [uid]: Array<string> = contextValues.token.split('_');
      const userItem: UserItem | undefined = userList.find((o: UserItem): boolean => o.uid === uid);

      if (!userItem) throw new Error('账号不存在');

      return omit(userItem, ['password']);
    }
  }
};