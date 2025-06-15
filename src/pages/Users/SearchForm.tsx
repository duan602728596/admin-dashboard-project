import type { ReactElement } from 'react';
import { Form, Input, Select, Button, type FormInstance } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { UserGender } from '../../enum/gender.enum';
import { UserStatus } from '../../enum/userStatus.enum';

interface SearchFormSubmitValue {
  username?: string; // 搜索用户名
  gender?: UserGender | 'all'; // 搜索性别
  status?: UserStatus | 'all'; // 账号状态
}

// 搜索select options的配置
const genderOptions: Array<DefaultOptionType> = [
  { value: 'all', label: '所有' },
  { value: UserGender.Male, label: '男' },
  { value: UserGender.Female, label: '女' }
];

const statusOptions: Array<DefaultOptionType> = [
  { value: 'all', label: '所有' },
  { value: UserStatus.Available, label: '可用' },
  { value: UserStatus.Deactivated, label: '不可用' }
];

// 初始化表单的值
const formInitialState: SearchFormSubmitValue = {
  gender: 'all',
  status: 'all'
};

/* 用户的搜索 */
function SearchForm(props: {}): ReactElement {
  return (
    <Form className="mb-[20px]" layout="inline" initialValues={ formInitialState }>
      <Form.Item name="username" label="用户名">
        <Input className="w-[200px]" />
      </Form.Item>
      <Form.Item name="gender" label="性别">
        <Select className="!w-[100px]" options={ genderOptions } />
      </Form.Item>
      <Form.Item name="status" label="账号状态">
        <Select className="!w-[100px]" options={ statusOptions } />
      </Form.Item>
      <Button className="mr-[8px]" type="primary">搜索</Button>
      <Button type="primary" danger={ true }>重置</Button>
    </Form>
  );
}

export default SearchForm;