import { Home, Login } from './apps';

export const routes = [
  { Component: Home, exact: true, path: '/' },
  { Component: Login, path: '/login' },
];
