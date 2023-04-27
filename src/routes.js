import { Home, Login } from './apps';

export const routes = [
  { component: Home, exact: true, path: '/', loginRequired: true },
  { component: () => <p>Admin page</p>, path: '/admin', roles: ['Admin'] },
  { component: () => <p>Worker page</p>, path: '/worker', roles: ['Worker', 'User'] },
  { component: Login, path: '/login' },
];
