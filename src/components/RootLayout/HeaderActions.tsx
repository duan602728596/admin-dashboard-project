import { Fragment, type ReactElement } from 'react';
import { Button, Tooltip } from 'antd';
import { UserOutlined as IconUserOutlined, LogoutOutlined as IconLogoutOutlined } from '@ant-design/icons';
import { useUserInfoStore, type UserInfoStore } from '../../store/userInfo.store';

/* Header */
function HeaderActions(props: {}): ReactElement | null {
  const { userInfo }: UserInfoStore = useUserInfoStore();

  if (!userInfo) return null;

  return (
    <Fragment>
      <span className="mr-[16px] text-white">
        <IconUserOutlined className="mr-[6px]" />
        { userInfo.username }
      </span>
      <Tooltip title="退出">
        <Button size="small" icon={ <IconLogoutOutlined /> } />
      </Tooltip>
    </Fragment>
  );
}

export default HeaderActions;