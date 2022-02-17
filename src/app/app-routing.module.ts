import {loadMicroFrontendModule} from '../utils/mfe-loader';
import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot, Routes, UrlMatcher, UrlSegment, ROUTES} from '@angular/router';
import {DynamicRouterService} from './services/dynamic-router.service';

// Mock user token do to env requirements
@Injectable({
  providedIn: 'root'
})
class DemandGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    localStorage.setItem('authServiceDB', '{"expiration":"2022-03-16","token":"MDIzZWFlMDg6MTY0NzQ0MjA4MjozN2FhOGEwNDg2MWY2N2EwNDljYzhjZTljYWY5N2ZkYg=="}');
    return true;
  }

}

function loadDynamicRoutes(dynamicRouterService: DynamicRouterService) {
  const routes = dynamicRouterService.routes.getValue();
  return routes.map(curr => {
    switch (curr.type) {
      case 'angular': {
        return parseAngularRoutes(curr);
      }
      case 'vue': {
        return parseVueRoutes(curr);
      }
      case 'react': {
        return parseReactRoutes(curr);
      }
      default: {
        return {}
      }
    }
  });
}


function parseAngularRoutes(config) {
  return {
    path: config.path,
    loadChildren: async () => {
      const moduleGenerationCallback = async () => (await loadMicroFrontendModule({remoteName: config.remoteName, modulePath: config.modulePath}))[config.moduleName];
      const {[config.wrapperName]: WrapperGenerator} = await loadMicroFrontendModule({remoteName: config.remoteName, modulePath: config.wrapperPath});
      return WrapperGenerator(moduleGenerationCallback)
    },
    canActivate: [DemandGuard]
  }
}

function parseVueRoutes(config) {
  return {
    matcher: startsWith(config.path),
    loadChildren: async () => (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
    data: {
      loadMetadata: async () => await loadMicroFrontendModule({remoteName: config.remoteName, modulePath: config.wrapperPath}),
      component: config.componentName,
      basename: config.basename
    }
  }
}

function parseReactRoutes(config) {
  return {
    matcher: startsWith(config.path),
    loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
    data: {
      loadWrapper: async () => (await loadMicroFrontendModule({remoteName: config.remoteName, modulePath: config.wrapperPath})).default,
      loadComponent: async () => (await loadMicroFrontendModule({remoteName: config.remoteName, modulePath: config.componentPath})).default,
      basename: config.basename,
      legacyRouter: config.legacyRouter
    }
  }
}


export const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('./pages/home/home.module')).HomeModule
  }
];


function startsWith(prefix: string): UrlMatcher {
  return (url: UrlSegment[]) => {
    const fullUrl = url.map(u => u.path).join('/');
    if (fullUrl.startsWith(prefix)) {
      return {consumed: url};
    }
    return null;
  };
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    {
      provide: ROUTES,
      useFactory: loadDynamicRoutes,
      deps: [DynamicRouterService],
      multi: true
    }
  ]
})
export class AppRoutingModule { }
