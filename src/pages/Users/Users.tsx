import { useState, useEffect, useTransition, type ReactElement, type Dispatch as D, type SetStateAction as S, type TransitionStartFunction } from 'react';
import { Table, App } from 'antd';
import type { useAppProps as UseAppProps } from 'antd/es/app/context';
import type { ColumnType } from 'antd/es/table/interface';
import auth from '../../components/basic/auth/auth';
import SearchForm, { type SearchFormSubmitValue } from './SearchForm';
import { requestUserList, type UserListResponse } from '../../services/graphql';
import { Permissions } from '../../enum/permissions.enum';
import { UserGender } from '../../enum/gender.enum';
import { UserStatus } from '../../enum/userStatus.enum';
import type { UserItem } from '../../interface/user.interface';

/* 用户页面 */
function Users(props: {}): ReactElement {
  const { message: messageApi }: UseAppProps = App.useApp();
  const [current, setCurrent]: [number, D<S<number>>] = useState(1);
  const [listLength, setListLength]: [number, D<S<number>>] = useState(0); // 结果数量
  const [userList, setUserList]: [Array<UserItem>, D<S<Array<UserItem>>>] = useState([]);
  const [loading, userListStartTransition]: [boolean, TransitionStartFunction] = useTransition();

  /**
   * 初始化获取数据
   * @param { number } c - 当前分页
   */
  function getUserList(c: number): void {
    userListStartTransition(async (): Promise<void> => {
      const res: UserListResponse = await requestUserList(c);

      if ('errors' in res) {
        messageApi.error(res.errors[0].message);

        return;
      }

      setUserList(res.data.user.list.data);
      setCurrent(res.data.user.list.pagination.current);
      setListLength(res.data.user.list.pagination.length);
    });
  }

  // 修改分页
  function handlePageChange(page: number): void {
    getUserList(page);
  }

  const columns: Array<ColumnType<UserItem>> = [
    { title: '用户名', dataIndex: 'username' },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '角色',
      dataIndex: 'permissions',
      render: (value: Permissions): string => value[0] === Permissions.Admin ? '管理员' : '普通用户'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (value: UserGender): string => value === UserGender.Female ? '女' : '男'
    },
    {
      title: '生日',
      dataIndex: 'birthday'
    },
    {
      title: '账号状态',
      render: (value: UserStatus): ReactElement | string => value === UserStatus.Deactivated ? <span className="text-[#f5222d]">停用</span> : '正常'
    }
  ];

  useEffect(function() {
    getUserList(current);
  }, []);

  return (
    <div className="p-[20px]">
      <SearchForm />
      <Table size="middle"
        dataSource={ userList }
        columns={ columns }
        loading={ loading }
        pagination={{
          current,
          pageSize: 5,
          total: listLength,
          onChange: handlePageChange
        }}
      />
    </div>
  );
}

export default auth([Permissions.Admin])(Users);