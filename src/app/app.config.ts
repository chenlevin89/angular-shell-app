import {LayoutComponentConfiguration, LayoutHeaderComponentConfiguration} from '@ironsource/fusion-ui/components/layout/v2';

const LAYOUT_USER = {
  icon: 'user-circle',
  name: 'Example Username',
  email: 'test@irontest.com'
};

const LAYOUT_HEADER_MENU_ITEMS: any[] = [
  {icon: 'magic', name: 'Theme toggle'},
  {icon: 'logout', name: 'Sign out'}
];

const LAYOUT_SIDEBAR_MENU_ITEMS: any[] = [
  {
    icon: 'spaceship-v2',
    name: 'Demand',
    children: [
      {
        name: 'Home',
        route: '/'
      },
      {
        name:'Overview',
        route: '/demand/overview'
      },
      {
        name:'Management',
        route: '/demand/management'
      },
      {
        name:'Generator',
        route: '/demand/generator'
      }
    ]
  },
  {
    icon:'apps-v2',
    name:'Analytics',
    children: [
      {
        name: 'Overview',
        route: '/analytics/overview'
      },
      {
        name: 'Explore',
        route: '/analytics/explore'
      },
      {
        name: 'Cohorts',
        route: '/analytics/cohorts'
      }
    ]
  },
  {
    icon:'diamond-v2',
    name:'Ad Quality',
    children: [
      {
        name: 'Profile',
        route: '/tb/profile'
      },
      {
        name: 'Apps',
        route: '/tb/apps'
      },
      {
        name: 'Team',
        route: '/tb/team'
      }
    ]
  },
  // {
  //   icon: 'magic',
  //   name: 'React',
  //   route: '/custom'
  // },
  // {
  //   icon: 'magic',
  //   name: 'React2',
  //   route: '/custom2'
  // },
  // {
  //   icon: 'magic',
  //   name: 'Users',
  //   route: '/users'
  // },
  // {
  //   icon: 'magic',
  //   name: 'Vue',
  //   route: '/vue'
  // },
  // {
  //   icon: 'magic',
  //   name: 'Vue2',
  //   route: '/c_vue'
  // }
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
