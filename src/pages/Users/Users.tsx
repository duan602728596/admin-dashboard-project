import { useState, useEffect, useTransition, type ReactElement, type Dispatch as D, type SetStateAction as S, type TransitionStartFunction } from 'react';
import { Table, App } from 'antd';
import type { useAppProps as UseAppProps } from 'antd/es/app/context';
import type {
  ColumnType,
  SortOrder,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
  TableCurrentDataSource
} from 'antd/es/table/interface';
import auth from '../../components/basic/auth/auth';
import SearchForm from './SearchForm';
import { requestUserList, type UserListResponse } from '../../services/graphql';
import { Permissions } from '../../enum/permissions.enum';
import { UserGender } from '../../enum/gender.enum';
import { UserStatus } from '../../enum/userStatus.enum';
import type { UserItem, UserListSearchFormSubmitValue } from '../../interface/user.interface';

/* 用户页面 */
function Users(props: {}): ReactElement {
  const { message: messageApi }: UseAppProps = App.useApp();
  const [query, setQuery]: [UserListSearchFormSubmitValue, D<S<UserListSearchFormSubmitValue>>] = useState({}); // 查询条件
  const [current, setCurrent]: [number, D<S<number>>] = useState(1); // 分页
  const [birthdaySortOrder, setBirthdaySortOrder]: [SortOrder, D<S<SortOrder>>] = useState(null);
  const [listLength, setListLength]: [number, D<S<number>>] = useState(0); // 结果数量
  const [userList, setUserList]: [Array<UserItem>, D<S<Array<UserItem>>>] = useState([]); // 查询结果
  const [loading, userListStartTransition]: [boolean, TransitionStartFunction] = useTransition();

  /**
   * 初始化获取数据
   * @param { number } c - 当前分页
   * @param { UserListSearchFormSubmitValue } q - 搜索条件
   * @param { SortOrder } bo - 生日排序
   */
  function getUserList(c: number, q: UserListSearchFormSubmitValue, bo: SortOrder): void {
    userListStartTransition(async (): Promise<void> => {
      const res: UserListResponse = await requestUserList(c, q, bo);

      if ('errors' in res) {
        messageApi.error(res.errors[0].message);

        return;
      }

      setUserList(res.data.user.list.data);
      setCurrent(res.data.user.list.pagination.current);
      setListLength(res.data.user.list.pagination.length);
      setQuery(q);
      setBirthdaySortOrder(bo);
    });
  }

  // 修改分页
  function handlePageChange(page: number): void {
    getUserList(page, query, birthdaySortOrder);
  }

  // 搜索提交
  function handleFormSearch(val: UserListSearchFormSubmitValue): void {
    getUserList(1, val, birthdaySortOrder);
  }

  // 修改排序
  function handleTableChange(pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<UserItem> | SorterResult<UserItem>[], extra: TableCurrentDataSource<UserItem>): void {
    if (extra.action === 'sort' && !Array.isArray(sorter)) {
      if (sorter.field === 'birthday') {
        getUserList(1, query, sorter.order ?? null);
      } else {
        getUserList(1, query, null);
      }
    }
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
      dataIndex: 'birthday',
      sorter: true,
      sortOrder: birthdaySortOrder
    },
    {
      title: '账号状态',
      render: (value: UserStatus): ReactElement | string => value === UserStatus.Deactivated ? <span className="text-[#f5222d]">停用</span> : '正常'
    }
  ];

  useEffect(function() {
    getUserList(current, query, birthdaySortOrder);
  }, []);

  return (
    <div className="p-[20px]">
      <SearchForm onSearch={ handleFormSearch } />
      <Table size="middle"
        dataSource={ userList }
        columns={ columns }
        loading={ loading }
        rowKey="uid"
        pagination={{
          current,
          pageSize: 5,
          total: listLength,
          onChange: handlePageChange
        }}
        onChange={ handleTableChange }
      />
    </div>
  );
}

export default auth([Permissions.Admin])(Users);