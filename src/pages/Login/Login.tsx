import { useTransition, type TransitionStartFunction, type ReactElement } from 'react';
import { Navigate, useLocation, useNavigate, type NavigateFunction, type Location } from 'react-router';
import { Form, Input, Button, App, type FormInstance } from 'antd';
import type { Rule } from 'antd/es/form';
import type { useAppProps as UseAppProps } from 'antd/es/app/context';
import cs from 'classnames';
import style from './login.module.sass';
import { requestUserLogin, type UserLoginResponse } from '../../services/graphql';
import { getUserToken, setUserToken } from '../../utils/userToken';
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
  const location: Location = useLocation();
  const [form]: [FormInstance<FormSubmitValue>] = Form.useForm();
  const { message: messageApi }: UseAppProps = App.useApp();
  const [loginLoading, loginStartTransition]: [boolean, TransitionStartFunction] = useTransition();
  const userToken: string | null = getUserToken(); // 根据token判断是否跳转

  // 点击登录
  function handleLoginFormFinish(formSubmitValue: FormSubmitValue): void {
    loginStartTransition(async (): Promise<void> => {
      const res: UserLoginResponse = await requestUserLogin(formSubmitValue.username, formSubmitValue.password);

      if ('errors' in res) {
        messageApi.error(res.errors[0].message);

        return;
      }

      messageApi.success('登录成功！');
      setUserToken(res.data.user.login.token);
      setUserInfo(res.data.user.login.userInfo);
      navigate('/Home');
    });
  }

  // token存在时直接跳转到首页
  if (userToken) return <Navigate to="/Home" replace={ true } state={{ from: location }} />;

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