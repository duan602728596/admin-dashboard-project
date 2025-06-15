import type { CheckboxOptionType } from 'antd/es/checkbox/Group';
import type { DefaultOptionType } from 'antd/es/select';
import { UserStatus } from '../../../enum/userStatus.enum';
import { Permissions } from '../../../enum/permissions.enum';
import { UserGender } from '../../../enum/gender.enum';

/** 添加或者删除用户的表单的radio options的配置 */
export const genderRadioOptions: Array<CheckboxOptionType> = [
  { value: UserGender.Male, label: '男' },
  { value: UserGender.Female, label: '女' }
];

export const statusRadioOptions: Array<CheckboxOptionType> = [
  { value: UserStatus.Available, label: '可用' },
  { value: UserStatus.Deactivated, label: '不可用' }
];

export const permissionsRadioOptions: Array<CheckboxOptionType> = [
  { value: Permissions.Normal, label: '普通用户' },
  { value: Permissions.Admin, label: '管理员' }
];

/** 搜索select options的配置 */
export const genderOptions: Array<DefaultOptionType> = [
  { value: 'all', label: '所有' },
  { value: UserGender.Male, label: '男' },
  { value: UserGender.Female, label: '女' }
];

export const statusOptions: Array<DefaultOptionType> = [
  { value: 'all', label: '所有' },
  { value: UserStatus.Available, label: '可用' },
  { value: UserStatus.Deactivated, label: <span className="text-[#f5222d]">停用</span> }
];