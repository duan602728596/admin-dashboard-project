import { buildSchema, type GraphQLSchema } from 'graphql';

// 定义 GraphQL schema（mock 结构）
export const graphQLSchema: GraphQLSchema = buildSchema(/* GraphQL */`
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

  type Login {
    token: String,
    userInfo: UserItem
  }

  type User {
    login(username: String, password: String): Login
    info: UserItem
  }

  type Query {
    user: User
  }
`);