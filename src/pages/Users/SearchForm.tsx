import type { ReactElement, MouseEvent } from 'react';
import { Form, Input, Select, Button, type FormInstance } from 'antd';
import { genderOptions, statusOptions } from './utils/formOptions';
import type { UserListSearchFormSubmitValue } from '../../interface/user.interface';

// 初始化表单的值
const formInitialState: UserListSearchFormSubmitValue = {
  gender: 'all',
  status: 'all'
};

/**
 * 格式化表单的值
 * @param { UserListSearchFormSubmitValue } searchFormSubmitValue
 */
function formatUserListSearchFormSubmitValue(searchFormSubmitValue: UserListSearchFormSubmitValue): UserListSearchFormSubmitValue {
  const val: UserListSearchFormSubmitValue = { ...searchFormSubmitValue };

  if (val.status === 'all') delete val.status;

  if (val.gender === 'all') delete val.gender;

  for (const key in val) {
    if (val[key] === undefined) {
      delete val[key];
    }
  }

  return val;
}

interface SearchFormProps {
  onSearch(formValue: UserListSearchFormSubmitValue): void;
}

/* 用户的搜索 */
function SearchForm(props: SearchFormProps): ReactElement {
  const [form]: [FormInstance<UserListSearchFormSubmitValue>] = Form.useForm();

  // 搜索提交
  function handleSearchFinish(searchFormSubmitValue: UserListSearchFormSubmitValue): void {
    props.onSearch(formatUserListSearchFormSubmitValue(searchFormSubmitValue));
  }

  // 重置
  function handleResetClick(event: MouseEvent<HTMLButtonElement>): void {
    form.resetFields();
    props.onSearch(formatUserListSearchFormSubmitValue(form.getFieldsValue()));
  }

  return (
    <Form form={ form } layout="inline" initialValues={ formInitialState } onFinish={ handleSearchFinish }>
      <Form.Item name="username" label="用户名">
        <Input className="w-[200px]" allowClear={ true } />
      </Form.Item>
      <Form.Item name="gender" label="性别">
        <Select className="!w-[100px]" options={ genderOptions } allowClear={ true } />
      </Form.Item>
      <Form.Item name="status" label="账号状态">
        <Select className="!w-[100px]" options={ statusOptions } allowClear={ true } />
      </Form.Item>
      <Button className="mr-[8px]" type="primary" htmlType="submit">搜索</Button>
      <Button type="primary" danger={ true } onClick={ handleResetClick }>重置</Button>
    </Form>
  );
}

export default SearchForm;