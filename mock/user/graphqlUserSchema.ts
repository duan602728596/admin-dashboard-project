export const graphqlUserSchema: string = /* GraphQL */`
  # 用户信息
  type UserItem {
    uid: String,
    username: String,
    password: String,
    email: String,
    status: Int,
    permissions: [String],
    birthday: String,
    gender: Int
  }

  # 登录
  type Login {
    token: String,
    userInfo: UserItem
  }

  # 分页
  type Pagination {
    current: Int, # 当前页
    length: Int   # 总页数
  }

  # 用户列表
  type UserList {
    data: [UserItem],
    pagination: Pagination
  }

  # 添加或修改后返回的结果
  type AddOrUpdateResult {
    success: Boolean
  }

  # 用户
  type User {
    login(username: String, password: String): Login
    info: UserItem
    list(current: Int, search: String, birthdaySortOrder: String): UserList
    add(item: String): AddOrUpdateResult
    update(uid: String, item: String): AddOrUpdateResult
  }
`;