import type { ReactElement } from 'react';
import { Outlet } from 'react-router';

/* 网站除了登录外，其他的UI使用的布局 */
function BasicLayout(props: {}): ReactElement {
  return (
    <Outlet />
  );
}

export default BasicLayout;