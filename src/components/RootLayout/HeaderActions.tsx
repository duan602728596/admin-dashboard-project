import { Fragment, type ReactElement, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { Button, Tooltip, App } from 'antd';
import type { useAppProps as UseAppProps } from 'antd/es/app/context';
import { UserOutlined as IconUserOutlined, LogoutOutlined as IconLogoutOutlined } from '@ant-design/icons';
import { useUserInfoStore, type UserInfoStore } from '../../store/userInfo.store';
import { requestUserLogout, type UserAddOrUpdateResponse } from '../../services/graphql';
import { deleteUserToken } from '../../utils/userToken';

/* Header */
function HeaderActions(props: {}): ReactElement | null {
  const navigate: NavigateFunction = useNavigate();
  const { message: messageApi }: UseAppProps = App.useApp();
  const { userInfo, setUserInfo }: UserInfoStore = useUserInfoStore();

  // 退出
  async function handleUserLogoutClick(event: MouseEvent): Promise<void> {
    const res: UserAddOrUpdateResponse = await requestUserLogout();

    if ('errors' in res) {
      messageApi.error(res.errors[0].message);

      return;
    }

    deleteUserToken();
    setUserInfo(null);
    navigate('/Login');
  }

  if (!userInfo) return null;

  return (
    <Fragment>
      <span className="mr-[16px] text-white">
        <IconUserOutlined className="mr-[6px]" />
        { userInfo.username }
      </span>
      <Tooltip title="退出">
        <Button size="small" icon={ <IconLogoutOutlined /> } onClick={ handleUserLogoutClick } />
      </Tooltip>
    </Fragment>
  );
}

export default HeaderActions;