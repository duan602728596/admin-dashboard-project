import { Fragment, useState, useEffect, useTransition, type ReactElement, type Dispatch as D, type SetStateAction as S, type TransitionStartFunction, type MouseEvent } from 'react';
import { Table, App, Button } from 'antd';
import type { useAppProps as UseAppProps } from 'antd/es/app/context';
import type { ColumnType, SortOrder, FilterValue, SorterResult, TablePaginationConfig, TableCurrentDataSource } from 'antd/es/table/interface';
import { PlusCircleFilled as IconPlusCircleFilled } from '@ant-design/icons';
import { omit } from 'lodash-es';
import auth from '../../components/basic/auth/auth';
import SearchForm from './SearchForm';
import { requestUserList, requestUserAdd, requestUpdateUser, type UserListResponse, type UserAddOrUpdateResponse } from '../../services/graphql';
import { Permissions } from '../../enum/permissions.enum';
import { UserGender } from '../../enum/gender.enum';
import { UserStatus } from '../../enum/userStatus.enum';
import UserItemModal, { type FormValue } from './UserItemModal';
import type { UserItem, UserListSearchFormSubmitValue } from '../../interface/user.interface';

/* 用户页面 */
function Users(props: {}): ReactElement {
  const { message: messageApi }: UseAppProps = App.useApp();
  // 列表相关查询
  const [query, setQuery]: [UserListSearchFormSubmitValue, D<S<UserListSearchFormSubmitValue>>] = useState({}); // 查询条件
  const [current, setCurrent]: [number, D<S<number>>] = useState(1); // 分页
  const [birthdaySortOrder, setBirthdaySortOrder]: [SortOrder, D<S<SortOrder>>] = useState(null);
  const [listLength, setListLength]: [number, D<S<number>>] = useState(0); // 结果数量
  const [userList, setUserList]: [Array<UserItem>, D<S<Array<UserItem>>>] = useState([]); // 查询结果
  // 表单相关
  const [userInfoModalOpen, setUserInfoModalOpen]: [boolean, D<S<boolean>>] = useState(false);
  const [userInfoModalItem, setUserInfoModalItem]: [UserItem | undefined, D<S<UserItem | undefined>>] = useState(undefined);

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

  // 弹出层关闭
  function handleModalClose(event: MouseEvent<HTMLButtonElement>): void {
    setUserInfoModalOpen(false);
    setUserInfoModalItem(undefined);
  }

  // 提交
  async function handleModalValueSubmitClick(value: FormValue, item: UserItem | undefined): Promise<void> {
    let res: UserAddOrUpdateResponse;

    if (item) {
      res = await requestUpdateUser(item.uid, {
        email: value.email,
        status: value.status,
        birthday: value.birthday.format('YYYY-MM-DD'),
        permissions: [value.permissions],
        gender: value.gender
      });
    } else {
      res = await requestUserAdd(Object.assign(
        omit(value, ['confirmPassword', 'birthday', 'permissions']),
        {
          birthday: value.birthday.format('YYYY-MM-DD'),
          permissions: [value.permissions]
        }
      ));
    }

    if ('errors' in res) {
      messageApi.error(res.errors[0].message);

      return;
    }

    messageApi.success(item ? `用户【${ item.username }】的信息修改成功！` : '新用户添加成功！');
    setUserInfoModalOpen(false);
    setUserInfoModalItem(undefined);
    getUserList(current, query, birthdaySortOrder);
  }

  // 点击添加新用户
  function handleAddNewUserClick(event: MouseEvent<HTMLButtonElement>): void {
    setUserInfoModalOpen(true);
  }

  // 点击修改用户
  function handleUpdateUserClick(record: UserItem, event: MouseEvent<HTMLButtonElement>): void {
    setUserInfoModalItem(record);
    setUserInfoModalOpen(true);
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
      dataIndex: 'status',
      render: (value: UserStatus): ReactElement | string => value === UserStatus.Deactivated ? <span className="text-[#f5222d]">停用</span> : '正常'
    },
    {
      title: '操作',
      key: 'action',
      render: (_v: undefined, record: UserItem): ReactElement => <Button onClick={ (e: MouseEvent<HTMLButtonElement>): void => handleUpdateUserClick(record, e) }>修改</Button>
    }
  ];

  useEffect(function() {
    getUserList(current, query, birthdaySortOrder);
  }, []);

  return (
    <Fragment>
      <div className="p-[20px]">
        <div className="flex mb-[20px]">
          <div className="grow">
            <SearchForm onSearch={ handleFormSearch } />
          </div>
          <div>
            <Button type="primary" icon={ <IconPlusCircleFilled /> } onClick={ handleAddNewUserClick }>添加新用户</Button>
          </div>
        </div>
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
      <UserItemModal open={ userInfoModalOpen } item={ userInfoModalItem } onClose={ handleModalClose } onFormSubmit={ handleModalValueSubmitClick } />
    </Fragment>
  );
}

export default auth([Permissions.Admin], true)(Users);