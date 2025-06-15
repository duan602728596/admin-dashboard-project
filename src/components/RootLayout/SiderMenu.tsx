import type { ReactElement } from 'react';
import { useLocation, useNavigate, type Location, type NavigateFunction } from 'react-router';
import { Menu } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import type { MenuInfo } from 'rc-menu/es/interface';
import { omit } from 'lodash-es';
import { useUserInfoStore, type UserInfoStore } from '../../store/userInfo.store';
import { Permissions } from '../../enum/permissions.enum';

interface CustomMenuItem extends MenuItemType {
  auth?: Array<Permissions>;
}

const menuOptions: Array<CustomMenuItem> = [
  {
    key: 'home',
    label: '首页'
  },
  {
    key: 'users',
    label: '用户管理',
    auth: [Permissions.Admin]
  }
];

/* 定义左侧的菜单 */
function SiderMenu(props: {}): ReactElement {
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const { userInfo }: UserInfoStore = useUserInfoStore();
  const permissions: Array<Permissions> = userInfo?.permissions || [];

  // 根据权限展示菜单
  const formatMenuOptions: Array<MenuItemType> = menuOptions.filter((o: CustomMenuItem): boolean => {
    if (!o.auth) return true;

    return permissions.some((permission: Permissions): boolean => o.auth!.includes(permission));
  }).map((o: CustomMenuItem): MenuItemType => omit(o, ['auth']));

  // 选中
  const defaultSelectedKey: string = (location.pathname.replace(/^\//, '').split('/')[0] || 'Home').toLowerCase();

  // 点击切换路由
  function handleLinkClick(info: MenuInfo): void {
    const url: string = info.key[0].toUpperCase() + info.key.substring(1);

    navigate(`/${ url }`);
  }

  return <Menu defaultSelectedKeys={ [defaultSelectedKey] } items={ formatMenuOptions } onClick={ handleLinkClick } />;
}

export default SiderMenu;