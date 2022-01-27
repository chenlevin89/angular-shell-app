import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlMatcher, UrlSegment} from '@angular/router';

const routes: Routes = [
  {
    matcher: startsWith('react'),
    loadChildren: async () => await (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
    data: {
      loadWrapper: async () => (await import('reactRemote/Wrapper')).default,
      loadComponent: async () => (await import('reactRemote/Custom')).default,
      basename: 'react'
    }
  },
  {
    matcher: startsWith('custom'),
    loadChildren: async () => await (await import('./components/react-wrapper/react-wrapper.module')).ReactWrapperModule,
    data: {
      loadWrapper: async () => (await import('reactRemote/Wrapper')).default,
      loadComponent: async () => (await import('reactRemote/Custom2')).default,
      basename: 'custom'
    }
  },
  {
    matcher: startsWith('vue'),
    loadChildren: async () => await (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
    data: {
      loadMetadata: async () => await import('vueRemote/Wrapper'),
      component: 'Custom',
      basename: 'vue'
    }
  },
  {
    matcher: startsWith('c_vue'),
    loadChildren: async () => await (await import('./components/vue-wrapper/vue-wrapper.module')).VueWrapperModule,
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
