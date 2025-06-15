import { useTransition, TransitionStartFunction, type ReactElement } from 'react';
import { useNavigate, NavigateFunction } from 'react-router';
import { Form, Input, Button, App, type FormInstance } from 'antd';
import type { Rule } from 'antd/es/form';
import type { useAppProps as UseAppProps } from 'antd/es//app/context';
import cs from 'classnames';
import style from './login.module.sass';
import { requestUserLogin, type UserLoginResponse } from '../../services/users';
import { setUserToken } from '../../utils/userToken';
import { useUserInfoStore, type UserInfoStore } from '../../store/userInfo.store';

interface FormSubmitValue {
  username: string;
  password: string;
}

// 表单验证
const usernameRules: Array<Rule> = [{ required: true, whitespace: true, message: '必须输入用户名' }],
  passwordRules: Array<Rule> = [{ required: true, whitespace: true, message: '必须输入密码' }];

/* 登录页面 */
function Login(props: {}): ReactElement {
  const { setUserInfo }: UserInfoStore = useUserInfoStore();
  const navigate: NavigateFunction = useNavigate();
  const [form]: [FormInstance<FormSubmitValue>] = Form.useForm();
  const { message: messageApi }: UseAppProps = App.useApp();
  const [loginLoading, loginStartTransition]: [boolean, TransitionStartFunction] = useTransition();

  // 点击登录
  function handleLoginFormFinish(formSubmitValue: FormSubmitValue): void {
    loginStartTransition(async (): Promise<void> => {
      const res: UserLoginResponse = await requestUserLogin(formSubmitValue.username, formSubmitValue.password);

      if (res.code === 0) {
        messageApi.error(res.errorMessage);

        return;
      }

      messageApi.success('登录成功！');
      setUserToken(res.data.token);
      setUserInfo(res.data.userInfo);
      navigate('/Home');
    });
  }

  return (
    <div className={ cs('w-full h-full content-center', style.container) }>
      <div className={ cs('mx-auto w-[480px] h-[300px] px-[20px] py-[25px] rounded-[18px]', style.formContainer) }>
        <h1 className="mb-[18px] text-[22px] text-bold text-center">简易管理系统</h1>
        <Form form={ form } labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={ handleLoginFormFinish }>
          <Form.Item name="username" label="用户名" rules={ usernameRules }>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={ passwordRules }>
            <Input.Password />
          </Form.Item>
          <Button className="mt-[18px]" type="primary" htmlType="submit" block={ true } loading={ loginLoading }>登录</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;