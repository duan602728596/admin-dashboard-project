import { useEffect, useTransition, type ReactElement, type TransitionStartFunction } from 'react';
import { App } from 'antd';
import type { useAppProps as UseAppProps } from 'antd/es//app/context';
import RootLayout from '../RootLayout/RootLayout';
import { requestUserInfo, type UserInfoResponse } from '../../services/graphql';
import { useUserInfoStore, type UserInfoStore } from '../../store/userInfo.store';

/* 根组件，判断是否登录，并且在登录后每次加载时重新获取用户信息 */
function Root(props: {}): ReactElement | null {
  const { userInfo, setUserInfo }: UserInfoStore = useUserInfoStore();
  const [userInfoLoading, userInfoStartTransition]: [boolean, TransitionStartFunction] = useTransition();
  const { message: messageApi }: UseAppProps = App.useApp();

  // 加载数据
  function getUserInfoData(): void {
    if (userInfo) return;

    userInfoStartTransition(async (): Promise<void> => {
      const res: UserInfoResponse = await requestUserInfo();

      if ('errors' in res) {
        messageApi.error(`获取用户信息错误：${ res.errors[0].message }。请刷新当前页面`);

        return;
      }

      setUserInfo(res.data.user.info);
    });
  }

  useEffect(function(): void {
    getUserInfoData();
  }, []);

  return <RootLayout />;
}

export default Root;