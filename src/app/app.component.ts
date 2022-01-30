import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutComponentConfiguration, SidebarMenuItem} from '@ironsource/fusion-ui';
import {BehaviorSubject} from 'rxjs';
import {routes} from './app-routing.module';
import {LAYOUT_CONFIGURATION} from './app.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  static overrideHistoryPushState = false;

  layoutConfiguration$ = new BehaviorSubject<LayoutComponentConfiguration>(LAYOUT_CONFIGURATION);

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    this.overrideHistoryOnPushMethod();
  }


  menuSidebarItemClicked(item: SidebarMenuItem): void {
    this.router.navigate([item.route]);
  }


  private overrideHistoryOnPushMethod(): void {
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
