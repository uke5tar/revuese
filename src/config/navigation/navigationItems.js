import { pathTo } from '@/plugins/router/helper';


export const accountItems = [
  {
    title: 'Account',
    icon: 'account_circle',
    id: 'account',
    path: pathTo.account,
  },
  {
    title: 'Language',
    icon: 'language',
    id: 'language',
    path: pathTo.language,
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

export const noAuthItems = [
  {
    title: 'Language',
    icon: 'language',
    id: 'language',
    path: pathTo.language,
  },
  {
    title: 'Login',
    icon: 'mdi-login',
    id: 'login',
    path: pathTo.login,
  },
];

export const menuItems = [
  {
    title: 'Home',
    icon: 'home',
    path: pathTo.home,
  },
  {
    title: 'Authenticated',
    icon: 'tag_faces',
    path: pathTo.authenticated,
    auth: true,
  },
  {
    title: 'Guest',
    icon: 'hotel',
    path: pathTo.guest,
    role: 'guest',
  },
];

export const additionalItems = [
  {
    title: 'Dataprivacy',
    icon: 'remove',
    path: pathTo.dataprivacy,
  },
  {
    title: 'Imprint',
    icon: 'remove',
    path: pathTo.imprint,
  },
];
