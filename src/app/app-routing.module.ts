import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot, Routes, UrlMatcher, UrlSegment, UrlTree} from '@angular/router';

// Mock user token do to env requirements
@Injectable({
  providedIn:'root'
})
class DemandGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    localStorage.setItem('authServiceDB', '{"expiration":"2022-03-16","token":"MDIzZWFlMDg6MTY0NzQ0MjA4MjozN2FhOGEwNDg2MWY2N2EwNDljYzhjZTljYWY5N2ZkYg=="}');
    return true;
  }

}

export const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('./pages/home/home.module')).HomeModule

  },
  // {
  //   matcher: startsWith('custom2'),
  //   loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
  //   data: {
  //     loadWrapper: async () => (await import('reactRemote/Wrapper')).default,
  //     loadComponent: async () => (await import('reactRemote/Custom2')).default,
  //     basename: 'custom2'
  //   }
  // },
  // {
  //   matcher: startsWith('custom'),
  //   loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
  //   data: {
  //     loadWrapper: async () => (await import('reactRemote/Wrapper')).default,
  //     loadComponent: async () => (await import('reactRemote/Custom')).default,
  //     basename: 'custom'
  //   }
  // },
  // {
  //   matcher: startsWith('users'),
  //   loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
  //   data: {
  //     loadWrapper: async () => (await import('reactRemote/Wrapper')).default,
  //     loadComponent: async () => (await import('reactRemote/Users')).default,
  //     basename: 'users'
  //   }
  // },
  {
    matcher: startsWith('tb/profile'),
    loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
    data: {
      loadWrapper: async () => (await import('adQualityRemote/Wrapper')).default,
      loadComponent: async () => (await import('adQualityRemote/Profile')).default,
      basename: '/tb/profile',
      legacyRouter:true
    }
  },
  {
    matcher: startsWith('tb/apps'),
    loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
    data: {
      loadWrapper: async () => (await import('adQualityRemote/Wrapper')).default,
      loadComponent: async () => (await import('adQualityRemote/Apps')).default,
      basename: '/tb/apps',
      legacyRouter:true
    }
  },
  {
    matcher: startsWith('tb/team'),
    loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
    data: {
      loadWrapper: async () => (await import('adQualityRemote/Wrapper')).default,
      loadComponent: async () => (await import('adQualityRemote/Team')).default,
      basename: '/tb/team',
      legacyRouter:true
    }
  },
  {
    matcher: startsWith('analytics/overview'),
    loadChildren: async () => (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
    data: {
      loadMetadata: async () => await import('analyticsRemote/Wrapper'),
      component: 'analyticsOverviewPage',
      basename: ''
    }
  },
  {
    matcher: startsWith('analytics/explore'),
    loadChildren: async () => (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
    data: {
      loadMetadata: async () => await import('analyticsRemote/Wrapper'),
      component: 'analyticsExplorePage',
      basename: ''
    }
  },
  {
    matcher: startsWith('analytics/cohorts'),
    loadChildren: async () => (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
    data: {
      loadMetadata: async () => await import('analyticsRemote/Wrapper'),
      component: 'analyticsCohortsPage',
      basename: ''
    }
  },
  {
    path:'demand/overview',
    loadChildren: async () => {
      const moduleGenerationCallback = async () => (await import('demandPlatform/Overview')).OverviewModule;
      const {WrapperGenerator} = await import('demandPlatform/Wrapper');
      return WrapperGenerator(moduleGenerationCallback)
    },
    canActivate: [DemandGuard]
  },
  {
    path:'demand/management',
    loadChildren :async () => {
      const moduleGenerationCallback = async () => (await import('demandPlatform/Management')).ManagementDefaultViewModule;
      const {WrapperGenerator} = await import('demandPlatform/Wrapper');
      return WrapperGenerator(moduleGenerationCallback)
    },
    canActivate: [DemandGuard]
  }
  // {
  //   matcher: startsWith('vue'),
  //   loadChildren: async () => (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
  //   data: {
  //     loadMetadata: async () => await import('vueRemote/Wrapper'),
  //     component: 'Custom',
  //     basename: 'vue'
  //   }
  // },
  // {
  //   matcher: startsWith('c_vue'),
  //   loadChildren: async () => (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
  //   data: {
  //     loadMetadata: async () => await import('vueRemote/Wrapper'),
  //     component: 'Custom2',
  //     basename: 'c_vue'
  //   }
  // }
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
