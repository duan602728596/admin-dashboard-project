import { Fragment, useEffect, type ReactElement, type MouseEvent } from 'react';
import { Form, Modal, Input, Radio, DatePicker, type FormInstance } from 'antd';
import type { CheckboxOptionType } from 'antd/es/checkbox/Group';
import type { Rule } from 'antd/es/form';
import { omit } from 'lodash-es';
import dayjs, { type Dayjs } from 'dayjs';
import { UserGender } from '../../enum/gender.enum';
import { UserStatus } from '../../enum/userStatus.enum';
import { Permissions } from '../../enum/permissions.enum';
import type { UserItem } from '../../interface/user.interface';

export interface FormValue extends Omit<UserItem, 'uid' | 'permissions' | 'birthday'> {
  confirmPassword?: string;
  permissions: Permissions; // 目前表单里的权限是单选，后期可以拆分成多选，用来针对更新颗粒度的权限
  birthday: Dayjs;
}

interface UserItemModalProps {
  open: boolean;   // Modal的显示状态
  item?: UserItem; // 如果有item是修改，否则是添加
  onFormSubmit(values: FormValue, u: UserItem | undefined): (void | Promise<void>); // 表单确认，并提交
  onClose(event: MouseEvent<HTMLButtonElement>): void; // 关闭弹出层
}

// 搜索select options的配置
const genderRadioOptions: Array<CheckboxOptionType> = [
  { value: UserGender.Male, label: '男' },
  { value: UserGender.Female, label: '女' }
];

const statusRadioOptions: Array<CheckboxOptionType> = [
  { value: UserStatus.Available, label: '可用' },
  { value: UserStatus.Deactivated, label: '不可用' }
];

const permissionsRadioOptions: Array<CheckboxOptionType> = [
  { value: Permissions.Normal, label: '普通用户' },
  { value: Permissions.Admin, label: '管理员' }
];

// 定义表单验证
const usernameRules: Array<Rule> = [
  { required: true, whitespace: true, message: '必须输入用户名' },
  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含数字、字母、下划线' }
];
const emailRules: Array<Rule> = [
  { required: true, whitespace: true, message: '必须输入邮箱' },
  { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式不正确' }
];
const birthdayRules: Array<Rule> = [{ required: true, message: '必须选择生日' }];
const genderRules: Array<Rule> = [{ required: true, message: '必须选择性别' }];


/* 添加和修改用户信息的表单 */
function UserItemModal(props: UserItemModalProps): ReactElement {
  const { open, item, onFormSubmit, onClose }: UserItemModalProps = props;
  const [form]: [FormInstance<FormValue>] = Form.useForm();

  // 定义表单验证
  const passwordRules: Array<Rule> = [
    !item && { required: true, whitespace: true, message: '必须输入密码' },
    { min: 6, message: '密码长度必须在6位以上' }
  ].filter(Boolean) as Array<Rule>;
  const confirmPasswordRules: Array<Rule> = [
    !item && { required: true, whitespace: true, message: '必须输入确认密码' },
    {
      async validator(rule: Rule, value: string | undefined): Promise<void> {
        const pwd: string | undefined = form.getFieldValue('password');

        if (pwd !== value) {
          throw new Error('密码和确认密码不同');
        } else {
          return await Promise.resolve();
        }
      }
    }
  ].filter(Boolean) as Array<Rule>;

  // 表单确认
  async function handleFormSubmitClick(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    let val: FormValue;

    try {
      val = await form.validateFields();
    } catch {
      return;
    }

    onFormSubmit(val, item);
  }

  useEffect(function(): void {
    if (open && item) {
      const v: FormValue = {
        ...omit(item, ['uid', 'password', 'permissions', 'birthday']),
        permissions: item.permissions[0],
        birthday: dayjs(item.birthday)
      };

      form.setFieldsValue(v);
    }
  }, [open, item]);

  return (
    <Modal title={ item ? `修改用户信息：${ item.username }` : '添加新用户' }
      open={ open }
      width={ 500 }
      centered={ true }
      destroyOnHidden={ true }
      maskClosable={ false }
      closeIcon={ null }
      afterClose={ form.resetFields }
      onOk={ handleFormSubmitClick }
      onCancel={ onClose }
    >
      <Form form={ form } initialValues={{ permissions: Permissions.Normal, status: UserStatus.Available }} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
        {
          item ? <Form.Item label="用户名">{ item.username }</Form.Item> : (
            <Form.Item name="username" label="用户名" rules={ usernameRules }>
              <Input />
            </Form.Item>
          )
        }
        {
          item ? null : (
            <Fragment>
              <Form.Item name="password" label="初始密码" rules={ passwordRules }>
                <Input.Password />
              </Form.Item>
              <Form.Item name="confirmPassword" label="确认密码" rules={ confirmPasswordRules }>
                <Input.Password />
              </Form.Item>
            </Fragment>
          )
        }
        <Form.Item name="email" label="邮箱" rules={ emailRules }>
          <Input />
        </Form.Item>
        <Form.Item name="permissions" label="权限">
          <Radio.Group options={ permissionsRadioOptions } />
        </Form.Item>
        <Form.Item name="status" label="账号状态">
          <Radio.Group options={ statusRadioOptions } />
        </Form.Item>
        <Form.Item name="birthday" label="出生日期" rules={ birthdayRules }>
          <DatePicker />
        </Form.Item>
        <Form.Item name="gender" label="性别" rules={ genderRules }>
          <Radio.Group options={ genderRadioOptions } />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserItemModal;