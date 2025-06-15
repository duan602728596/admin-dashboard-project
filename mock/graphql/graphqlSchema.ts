import { buildSchema, type GraphQLSchema } from 'graphql';
import { graphqlUserSchema } from '../user/graphqlUserSchema';

// 定义 GraphQL schema（mock结构）
export const graphQLSchema: GraphQLSchema = buildSchema(/* GraphQL */`
  ${ graphqlUserSchema }

  type Query {
    user: User
  }
`);