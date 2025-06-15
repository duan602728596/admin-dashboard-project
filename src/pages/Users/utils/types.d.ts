import type { Dayjs } from 'dayjs';
import type { UserItem } from '../../../interface/user.interface';
import type { Permissions } from '../../../enum/permissions.enum';

/** UserItemModal内，添加或者修改用户信息表单定义的Form的Value类型 */
export interface UserItemModalFormValue extends Omit<UserItem, 'uid' | 'permissions' | 'birthday'> {
  confirmPassword?: string;
  permissions: Permissions; // 目前表单里的权限是单选，后期可以拆分成多选，用来针对更新颗粒度的权限
  birthday: Dayjs;
}
