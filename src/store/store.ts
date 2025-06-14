import {
  configureStore,
  combineReducers,
  type Reducer,
  type Store,
  type ImmutableStateInvariantMiddlewareOptions,
  type SerializableStateInvariantMiddlewareOptions
} from '@reduxjs/toolkit';
// @ts-expect-error
import type { GetDefaultMiddleware } from '@reduxjs/toolkit/src/getDefaultMiddleware';
// @ts-expect-error
import type { Middlewares } from '@reduxjs/toolkit/src/configureStore';
// @ts-expect-error
import type { Tuple } from '@reduxjs/toolkit/src/utils';
import { reducersMapObject, ignoreOptions } from './reducers';

/* 全局的store */
interface ThunkOptions<E = any> {
  extraArgument: E;
}

interface GetDefaultMiddlewareOptions {
  thunk?: boolean | ThunkOptions;
  immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions;
  serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions;
}

/* reducer列表 */
const reducer: Reducer = combineReducers(reducersMapObject);

/* store */
export let store: Store;

/* 创建store */
function createStore(initialState: any = {}): void {
  store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware(getDefaultMiddleware: GetDefaultMiddleware): Tuple<Middlewares<any>> {
      return getDefaultMiddleware<GetDefaultMiddlewareOptions>({
        immutableCheck: ignoreOptions,
        serializableCheck: ignoreOptions
      });
    }
  });
}

/* 创建（一次）并返回store */
export function storeFactory(initialState: any = {}): Store {
  if (!store) {
    createStore(initialState);
  }

  return store;
}