import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

const routes = [
  {
    type: 'angular',
    path: 'demand',
    remoteName: 'demandPlatform',
    modulePath: './FederationWrapper',
    exportName: 'FederationWrapperModule'
  },
  // {
  //   type: 'vue',
  //   path: 'analytics/overview', // inner path not relevant
  //   remoteName: 'analyticsRemote',
  //   wrapperPath: './Wrapper',
  //   componentName: 'analyticsOverviewPage',
  //   basename: ''
  // },
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
