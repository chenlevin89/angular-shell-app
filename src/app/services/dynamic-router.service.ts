import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

const routes = [
  {
    type: 'angular',
    path: 'demand',
    remoteName: 'demandPlatform',
    modulePath: './AppModule',
  },
  {
    type: 'vue',
    path: 'analytics/overview', // inner path not relevant
    remoteName: 'analyticsRemote',
    wrapperPath: './Wrapper',
    componentName: 'analyticsOverviewPage',
    basename: ''
  },
  {
    type: 'vue',
    path: 'analytics/explore',
    remoteName: 'analyticsRemote',
    wrapperPath: './Wrapper',
    componentName: 'analyticsExplorePage',
    basename: ''
  },
  {
    type: 'vue',
    path: 'analytics/cohorts',
    remoteName: 'analyticsRemote',
    wrapperPath: './Wrapper',
    componentName: 'analyticsCohortsPage',
    basename: ''
  },
  {
    type: 'react',
    path: 'tb/profile',
    remoteName: 'adQualityRemote',
    wrapperPath: './Wrapper',
    componentPath: './Profile',
    basename: 'tb/profile',
    legacyRouter: true
  },
  {
    type: 'react',
    path: 'tb/apps',
    remoteName: 'adQualityRemote',
    wrapperPath: './Wrapper',
    componentPath: './Apps',
    basename: 'tb/apps',
    legacyRouter: true
  },
  {
    type: 'react',
    path: 'tb/team',
    remoteName: 'adQualityRemote',
    wrapperPath: './Wrapper',
    componentPath: './Team',
    basename: 'tb/team',
    legacyRouter: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class DynamicRouterService {

  routes = new BehaviorSubject<any[]>([]);

  constructor() { }

  async getRoutes() {
    const routes = await getRoutes();
    this.routes.next(routes);
  }
}

function getRoutes(): Promise<any[]> {
  return new Promise(res => {
    setTimeout(() => {
      res(routes)
    }, 100);
  })
}
