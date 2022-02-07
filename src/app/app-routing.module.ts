import {NgModule} from '@angular/core';
import {async} from '@angular/core/testing';
import {RouterModule, Routes, UrlMatcher, UrlSegment} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('./pages/home/home.module')).HomeModule

  },
  {
    matcher: startsWith('custom2'),
    loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
    data: {
      loadWrapper: async () => (await import('reactRemote/Wrapper')).default,
      loadComponent: async () => (await import('reactRemote/Custom2')).default,
      basename: 'custom2'
    }
  },
  {
    matcher: startsWith('custom'),
    loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
    data: {
      loadWrapper: async () => (await import('reactRemote/Wrapper')).default,
      loadComponent: async () => (await import('reactRemote/Custom')).default,
      basename: 'custom'
    }
  },
  {
    matcher: startsWith('users'),
    loadChildren: async () => (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
    data: {
      loadWrapper: async () => (await import('reactRemote/Wrapper')).default,
      loadComponent: async () => (await import('reactRemote/Users')).default,
      basename: 'users'
    }
  },
  {
    matcher: startsWith('vue'),
    loadChildren: async () => (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
    data: {
      loadMetadata: async () => await import('vueRemote/Wrapper'),
      component: 'Custom',
      basename: 'vue'
    }
  },
  {
    matcher: startsWith('c_vue'),
    loadChildren: async () => (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
    data: {
      loadMetadata: async () => await import('vueRemote/Wrapper'),
      component: 'Custom2',
      basename: 'c_vue'
    }
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
