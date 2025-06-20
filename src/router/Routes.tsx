import type { ReactElement } from 'react';
import { useRoutes } from 'react-router';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import Root from '../components/Root/Root';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Users from '../pages/Users/Users';

/* 路由的管理 */
function Routes(props: {}): ReactElement | null {
  const routers: ReactElement | null = useRoutes([
    {
      path: '/Login',
      element: <Login />
    },
    {
      path: '/',
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: 'Home', element: <Home /> },
        { path: 'Users', element: <Users /> },
        { path: '*', element: <PageNotFound /> }
      ]
    }
  ]);

  return routers;
}

export default Routes;