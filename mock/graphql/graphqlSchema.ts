import { buildSchema, type GraphQLSchema } from 'graphql';

// 定义 GraphQL schema（mock 结构）
export const graphQLSchema: GraphQLSchema = buildSchema(/* GraphQL */`
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

  type User {
    login(username: String, password: String): Login
    info: UserItem
    list(current: Int, search: String, birthdaySortOrder: String): UserList
  }

  type Query {
    user: User
  }
`);