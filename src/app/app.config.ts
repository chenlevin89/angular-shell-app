import {SidebarMenuItem, LayoutComponentConfiguration, LayoutHeaderComponentConfiguration} from '@ironsource/fusion-ui';

const LAYOUT_USER = {
  icon: 'user-circle',
  name: 'Example Username',
  email: 'test@irontest.com'
};

const LAYOUT_HEADER_MENU_ITEMS: SidebarMenuItem[] = [
  {icon: 'magic', name: 'Theme toggle'},
  {icon: 'logout', name: 'Sign out'}
];

const LAYOUT_SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    icon: 'magic',
    name: 'Home',
    route: ''
  },
  {
    icon: 'magic',
    name: 'React',
    route: '/custom'
  },
  {
    icon: 'magic',
    name: 'React2',
    route: '/custom2'
  },
  {
    icon: 'magic',
    name: 'Users',
    route: '/users'
  },
  {
    icon: 'magic',
    name: 'Vue',
    route: '/vue'
  },
  {
    icon: 'magic',
    name: 'Vue2',
    route: '/c_vue'
  }
];

const LAYOUT_HEADER_CONFIGURATION: LayoutHeaderComponentConfiguration = {
  title: {
    text: 'Header'
  },
  menuItems: LAYOUT_HEADER_MENU_ITEMS
};

export const LAYOUT_CONFIGURATION: LayoutComponentConfiguration = {
  sidebarMenuItems: LAYOUT_SIDEBAR_MENU_ITEMS,
  headerConfiguration: LAYOUT_HEADER_CONFIGURATION,
  user: LAYOUT_USER
};
