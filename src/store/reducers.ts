import type { ReducersMapObject } from '@reduxjs/toolkit';
import userInfoReducers from '../reducers/userInfo.reducer';

/* reducers */
export const reducersMapObject: ReducersMapObject = Object.assign({},
  userInfoReducers
);

/* 忽略paths或者actions */
export const ignoreOptions: any = {
  ignoredPaths: [],
  ignoredActions: []
};