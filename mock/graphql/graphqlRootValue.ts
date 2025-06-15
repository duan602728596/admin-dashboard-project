import { userRootValue, type UserRootValue } from '../user/rootValue';

interface GraphqlRootValue {
  user: UserRootValue;
}

/** 定义GraphQL的root value */
export const graphQLRootValue: GraphqlRootValue = {
  user: userRootValue
};