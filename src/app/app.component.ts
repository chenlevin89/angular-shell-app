import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {LayoutComponentConfiguration, LayoutHeaderComponentConfiguration, SidebarMenuItem} from '@ironsource/fusion-ui';
import {BehaviorSubject, debounceTime, delay, filter, fromEvent, map, merge, Observable, pluck, scan, startWith, Subject, tap} from 'rxjs';
import {routes} from './app-routing.module';
import {LAYOUT_CONFIGURATION} from './app.config';
import {PubSubService} from './services/pub-sub.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  static overrideHistoryPushState = false;

  layoutConfiguration$: Observable<LayoutComponentConfiguration>;
  loading$: Observable<boolean>;

  constructor(private readonly router: Router,
    private readonly pubSubService: PubSubService) {
  }

  ngOnInit(): void {
    this.layoutConfiguration$ = this.getLayoutObservable();
    this.overrideHistoryOnPushMethod();
    this.setLoading();
  }

  menuSidebarItemClicked(item: SidebarMenuItem): void {
    this.router.navigate([item.route]);
  }

  private getLayoutObservable(): Observable<LayoutComponentConfiguration> {
    const layoutEvent$ = fromEvent(document.body, 'header_changed').pipe(pluck('detail'));

    return layoutEvent$.pipe(
      startWith({}),
      scan((acc, curr: Partial<LayoutHeaderComponentConfiguration>) => {
        return {
          ...acc,
          headerConfiguration: {
            ...acc.headerConfiguration,
            title: curr.title,
            content: curr.content
          }
        };
      }, {...LAYOUT_CONFIGURATION}),
    )
  }

  private setLoading(): void {
    const pubSubEvents$ = this.pubSubService.register('loading');
    const globalLoaderEvents$ = fromEvent(document.body, 'set_loader').pipe(pluck('detail'));
    const routerEvents$ = this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd),
      map(e => e instanceof NavigationStart)
    );
    this.loading$ = merge(routerEvents$, pubSubEvents$, globalLoaderEvents$).pipe(debounceTime(10));
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
