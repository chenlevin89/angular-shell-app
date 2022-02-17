import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes, ROUTES} from "@angular/router";
import {DynamicRouterService} from "./services/dynamic-router.service";



function generateRoutes(dynamicRouterService: DynamicRouterService) {
  const routes: Routes = [
    {
      path: '',
      loadChildren: async () => {
        await dynamicRouterService.getRoutes();
        return (await import('./app-routing.module')).AppRoutingModule;
      }
    }
  ];
  return routes;
}


@NgModule({
  imports: [RouterModule.forRoot([], {preloadingStrategy:PreloadAllModules})],
  providers: [{
    provide: ROUTES,
    useFactory: generateRoutes,
    deps: [DynamicRouterService],
    multi: true
  }],
  exports: [RouterModule]
})
export class DynamicRoutingModule { }
