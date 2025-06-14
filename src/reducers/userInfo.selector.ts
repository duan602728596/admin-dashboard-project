import { createStructuredSelector, type Selector } from 'reselect';
import { selectorsObject, type UserInfoInitialState } from './userInfo.reducer';

/* redux selector */
type RState = { userInfo: UserInfoInitialState; };

export const userInfoSelector: Selector<RState, UserInfoInitialState> = createStructuredSelector({ ...selectorsObject });