import { pathTo } from '@/plugins/router/helper';


export const appbarItems = [
  {
    title: 'Account',
    icon: 'account_circle',
    id: 'account',
    path: pathTo.account,
  },
  {
    title: 'Settings',
    icon: 'settings',
    id: 'settings',
    path: pathTo.settings,
  },
  {
    title: 'Logout',
    icon: 'logout',
    id: 'logout',
  },
];

export const navigationDrawerItems = [
  {
    title: 'Home',
    icon: 'home',
    path: pathTo.home,
  },
];
