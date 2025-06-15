import type { UserStatus } from '../enum/userStatus.enum';
import type { Permissions } from '../enum/permissions.enum';
import type { UserGender } from '../enum/gender.enum';

/* 定义用户的各种信息 */
export interface UserItem {
  uid: string;        // 用户的唯一uid
  username: string;   // 用户名
  password?: string;  // !!!注意密码类型仅用于mock
  email: string;      // 邮箱
  status: UserStatus; // 用户状态
  permissions: Array<Permissions>; // 定义账号的权限
  birthday: string;   // 出生日期
  gender: UserGender; // 性别
}

/* 定义用户的搜索条件 */
export interface UserListSearchFormSubmitValue {
  username?: string; // 搜索用户名
  gender?: UserGender | 'all'; // 搜索性别
  status?: UserStatus | 'all'; // 账号状态
}