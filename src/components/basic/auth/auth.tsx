import type { ReactElement, FunctionComponent } from 'react';
import { Result } from 'antd';
import { Permissions } from '../../../enum/permissions.enum';
import { useUserInfoStore, type UserInfoStore } from '../../../store/userInfo.store';

type AuthReturnFunc = (Component: FunctionComponent) => FunctionComponent;

/**
 * 一个用于包装并且判断权限的组件
 * @param { Array<Permissions> } displayPermissions - 当有这个权限时，展示组件
 * @param { boolean } [display403Page] - 没有权限时显示403page
 */
function auth(displayPermissions: Array<Permissions>, display403Page?: boolean): AuthReturnFunc {
  /**
   * @param { FunctionComponent } Component - 被包装的组件
   */
  return function(Component: FunctionComponent): FunctionComponent {
    return function(props: Record<string, any>): ReactElement | null {
      const { userInfo }: UserInfoStore = useUserInfoStore();
      const userPermissions: Array<Permissions> = userInfo?.permissions || [];
      const canDisplay: boolean = userPermissions.some((o: Permissions): boolean => displayPermissions.includes(o));

      if (!canDisplay) {
        if (display403Page) {
          return <Result status="403" title="403" subTitle="对不起，你没有权限访问当前页面" />;
        } else {
          return null;
        }
      }

      return <Component { ...props } />;
    };
  };
}

export default auth;