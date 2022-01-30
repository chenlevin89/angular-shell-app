import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {routes} from './app-routing.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  static overrideHistoryPushState = false;

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    const original = window.history.pushState;
    const callback = this.handleMultiFrameworkRouteChange.bind(this);
    if (!AppComponent.overrideHistoryPushState) {
      window.history.pushState = function (...args: any) {
        AppComponent.overrideHistoryPushState = true;
        callback(args[2]);
        original.apply(this, args);
      }
    }
  }


  private handleMultiFrameworkRouteChange(route: string): void {
    const splitRoute = route.split('/');
    const baseRoute = splitRoute[1];
    const requiredRoute = splitRoute[2]?.split('?')[0];

    if (baseRoute && requiredRoute) {
      const isBaseRouteMfe = routes.find(curr => curr.data?.['basename'] === baseRoute);
      const isRequiredRouteMfe = routes.find(curr => curr.data?.['basename'] === requiredRoute);
      if (isBaseRouteMfe && isRequiredRouteMfe) {
        this.router.navigateByUrl(splitRoute.slice(2).join('/'));
      }
    }

  }

}
