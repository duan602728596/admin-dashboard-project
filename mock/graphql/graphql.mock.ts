import { defineMock } from 'vite-plugin-mock-dev-server';
import { graphql, type ExecutionResult } from 'graphql';
// @ts-expect-error
import type { Connect } from 'vite';
import type { MockRequest, MockResponse } from '../commonTypes';
import { graphQLSchema } from './graphqlSchema';
import { graphQLRootValue } from './graphqlRootValue';

/* 请求账户的列表 */
export default defineMock([
  {
    method: 'POST',
    url: '/api/graphql',
    async response(req: MockRequest, res: MockResponse, next: Connect.NextFunction): Promise<void> {
      const { query, variables }: { query: string, variables: any } = JSON.parse(req.body);
      const token: string | undefined = req.headers.token;
      const result: ExecutionResult = await graphql({
        schema: graphQLSchema,
        source: query,
        rootValue: graphQLRootValue,
        variableValues: variables,
        contextValue: { token }
      });

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    }
  }
]);