import type { ReactElement } from 'react';
import { Outlet } from 'react-router';
import { Layout } from 'antd';
import HeaderActions from './HeaderActions';

/* 网站除了登录外，其他的UI使用的布局 */
function RootLayout(props: {}): ReactElement {
  return (
    <Layout className="h-full">
      <Layout.Header className="!px-0">
        <div className="flex">
          <h1 className="w-[200px] text-[22px] text-bold text-white text-center">简易管理系统</h1>
          <div className="grow pr-[16px] text-right">
            <HeaderActions />
          </div>
        </div>
      </Layout.Header>
      <Layout>
        <Layout.Sider></Layout.Sider>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default RootLayout;