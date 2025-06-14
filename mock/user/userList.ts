import { UserGender } from '../../src/enum/gender.enum';
import { Permissions } from '../../src/enum/permissions.enum';
import { UserStatus } from '../../src/enum/userStatus.enum';
import type { UserItem } from '../../src/interface/user.interface';

/* 定义用户列表 */
export const userList: Array<UserItem> = [
  // 管理员
  {
    uid: '0',
    username: 'test_0',
    password: '12345678',
    email: 'test_0@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Admin],
    birthday: '1992-07-22',
    gender: UserGender.Male
  },
  {
    uid: '1',
    username: 'test_1',
    password: '12345678',
    email: 'test_1@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Admin],
    birthday: '1992-07-22',
    gender: UserGender.Female
  },
  // 普通账户
  {
    uid: '2',
    username: 'test_2',
    password: '12345678',
    email: 'test_2@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Male
  },
  {
    uid: '3',
    username: 'test_3',
    password: '12345678',
    email: 'test_3@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Female
  },
  {
    uid: '4',
    username: 'test_4',
    password: '12345678',
    email: 'test_3@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Male
  },
  {
    uid: '5',
    username: 'test_5',
    password: '12345678',
    email: 'test_3@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Female
  },
  {
    uid: '6',
    username: 'test_6',
    password: '12345678',
    email: 'test_6@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Male
  },
  {
    uid: '7',
    username: 'test_7',
    password: '12345678',
    email: 'test_7@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Female
  },
  {
    uid: '8',
    username: 'test_8',
    password: '12345678',
    email: 'test_8@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Male
  },
  {
    uid: '9',
    username: 'test_9',
    password: '12345678',
    email: 'test_9@gmail.com',
    status: UserStatus.Available,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Female
  },
  // 无法登录的
  {
    uid: '10',
    username: 'test_10',
    password: '12345678',
    email: 'test_10@gmail.com',
    status: UserStatus.Deactivated,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Male
  },
  {
    uid: '11',
    username: 'test_11',
    password: '12345678',
    email: 'test_11@gmail.com',
    status: UserStatus.Deactivated,
    permissions: [Permissions.Normal],
    birthday: '1992-07-22',
    gender: UserGender.Female
  }
];