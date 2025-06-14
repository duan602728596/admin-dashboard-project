import { useEffect, useTransition, type ReactElement, type TransitionStartFunction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { Dispatch } from '@reduxjs/toolkit';
import { App } from 'antd';
import type { useAppProps as UseAppProps } from 'antd/es//app/context';
import RootLayout from '../RootLayout/RootLayout';
import { requestUserInfo, type UserInfoResponse } from '../../services/users';
import { setUserInfo, type UserInfoInitialState } from '../../reducers/userInfo.reducer';
import { userInfoSelector } from '../../reducers/userInfo.selector';

/* 根组件，判断是否登录，并且在登录后每次加载时重新获取用户信息 */
function Root(props: {}): ReactElement | null {
  const { userInfo }: UserInfoInitialState = useSelector(userInfoSelector);
  const dispatch: Dispatch = useDispatch();
  const [userInfoLoading, userInfoStartTransition]: [boolean, TransitionStartFunction] = useTransition();
  const { message: messageApi }: UseAppProps = App.useApp();

  // 加载数据
  function getUserInfoData(): void {
    if (userInfo) return;

    userInfoStartTransition(async (): Promise<void> => {
      const res: UserInfoResponse = await requestUserInfo();

      if (!res.code) {
        messageApi.error(`获取用户信息错误：${ res.errorMessage }。请刷新当前页面`);

        return;
      }

      dispatch(setUserInfo(res.data));
    });
  }

  useEffect(function(): void {
    getUserInfoData();
  }, []);

  return <RootLayout />;
}

export default Root;