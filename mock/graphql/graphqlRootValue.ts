import { omit, random } from 'lodash-es';
import dayjs from 'dayjs';
import type { SortOrder } from 'antd/es/table/interface';
import { userList } from '../user/userList';
import { UserStatus } from '../../src/enum/userStatus.enum';
import type { GraphQLContext } from '../types';
import type { UserItem, UserListSearchFormSubmitValue } from '../../src/interface/user.interface';
import type { UserLoginResponseData, UserListResponseData } from '../../src/services/graphql';

interface UserLoginVariableValues {
  username: string;
  password: string;
}

interface UserListVariableValues {
  current: number;
  search: string;
  birthdaySortOrder: SortOrder;
}

interface UserAddVariableValues {
  item: string;
}

interface UserUpdateVariableValues extends UserAddVariableValues {
  uid: string;
}

interface GraphqlRootValue {
  user: {
    login(variableValues: UserLoginVariableValues, context: GraphQLContext): UserLoginResponseData;
    info(variableValues: null, context: GraphQLContext): Omit<UserItem, 'password'>;
    list(variableValues: UserListVariableValues, contextValues: GraphQLContext): UserListResponseData;
    add(variableValues: UserAddVariableValues, context: GraphQLContext): { success: boolean };
    update(variableValues: UserUpdateVariableValues, contextValues: GraphQLContext): { success: boolean };
  };
}

export const graphQLRootValue: GraphqlRootValue = {
  user: {
    // 用户登录
    login(variableValues: UserLoginVariableValues): UserLoginResponseData {
      const { username, password }: UserLoginVariableValues = variableValues;

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
    },

    // 用户列表
    list(variableValues: UserListVariableValues, contextValues: GraphQLContext): UserListResponseData {
      if (!contextValues.token) throw new Error('需要先登录');

      const width: number = 5;
      const { current, search, birthdaySortOrder }: UserListVariableValues = variableValues;
      const searchObject: UserListSearchFormSubmitValue = JSON.parse(search);
      const index: number = (current - 1) * width;
      let formatUserList: Array<Omit<UserItem, 'password'>> = userList.map((o: UserItem): Omit<UserItem, 'password'> => omit(o, ['password']));


      // 搜索用户名
      if (searchObject.username && !/^\s*$/.test(searchObject.username)) {
        formatUserList = formatUserList.filter((o: Omit<UserItem, 'password'>): boolean => o.username.includes(searchObject.username!));
      }

      // 性别
      if (typeof searchObject.gender === 'number') {
        formatUserList = formatUserList.filter((o: Omit<UserItem, 'password'>): boolean => o.gender === searchObject.gender);
      }

      // 状态
      if (typeof searchObject.status === 'number') {
        formatUserList = formatUserList.filter((o: Omit<UserItem, 'password'>): boolean => o.status === searchObject.status);
      }

      // 生日排序，按年纪大小
      if (birthdaySortOrder === 'ascend') {
        // 低 -> 高
        formatUserList.sort((a: Omit<UserItem, 'password'>, b: Omit<UserItem, 'password'>): number => dayjs(b.birthday).valueOf() - dayjs(a.birthday).valueOf());
      } else if (birthdaySortOrder === 'descend') {
        // 高 -> 低
        formatUserList.sort((a: Omit<UserItem, 'password'>, b: Omit<UserItem, 'password'>): number => dayjs(a.birthday).valueOf() - dayjs(b.birthday).valueOf());
      }

      return {
        data: formatUserList.slice(index, index + width),
        pagination: {
          current,
          length: formatUserList.length
        }
      };
    },

    // 添加新用户
    add(variableValues: UserAddVariableValues, contextValues: GraphQLContext): { success: boolean } {
      if (!contextValues.token) throw new Error('需要先登录');

      const { item }: UserAddVariableValues = variableValues;
      const endUserItem: UserItem | undefined = userList.at(-1);
      const uid: string = String(Number(endUserItem?.uid ?? 0) + 1);

      userList.push({
        uid,
        ...JSON.parse(item)
      });

      return { success: true };
    },

    // 更新用户
    update(variableValues: UserUpdateVariableValues, contextValues: GraphQLContext): { success: boolean } {
      if (!contextValues.token) throw new Error('需要先登录');

      const { item, uid }: UserUpdateVariableValues = variableValues;
      const userItemIndex: number = userList.findIndex((o: UserItem): boolean => o.uid === uid);

      if (userItemIndex < 0) throw new Error('账户不存在');

      const itemObject: UserItem = JSON.parse(item);
      const updateItem: Omit<UserItem, 'password' | 'uid' | 'username'> = omit(itemObject, ['password', 'uid', 'username']);

      Object.assign(userList[userItemIndex], updateItem);

      return { success: true };
    }
  }
};