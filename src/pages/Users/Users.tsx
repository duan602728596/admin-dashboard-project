import type { ReactElement } from 'react';
import SearchForm from './SearchForm';

/* 用户页面 */
function Users(props: {}): ReactElement {
  return (
    <div className="p-[20px]">
      <SearchForm />
    </div>
  );
}

export default Users;