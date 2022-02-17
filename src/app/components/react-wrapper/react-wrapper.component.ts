import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PubSubService} from '../../services/pub-sub.service';

@Component({
  selector: 'app-react-wrapper',
  templateUrl: './react-wrapper.component.html',
  styleUrls: ['./react-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly elementRef: ElementRef,
    private readonly pubSubService:PubSubService
  ) { }

  ngAfterViewInit(): void {
    this.activatedRoute.data
      .subscribe(async ({loadComponent, loadWrapper, basename,legacyRouter}) => {
        this.pubSubService.notify({type:'loading', value:true});
        ReactDOM.unmountComponentAtNode(this.elementRef.nativeElement);
        const [ReactWrapper, ReactComponent] = await Promise.all([loadWrapper(), loadComponent()]);
        const ChildComponent = legacyRouter ? ReactComponent :  React.createElement(ReactComponent);
        const ReactElement = React.createElement(ReactWrapper, {basename}, ChildComponent);
        ReactDOM.render(ReactElement, this.elementRef.nativeElement);
        this.pubSubService.notify({type:'loading', value:false});
      });
  }

  ngOnDestroy(): void {
    ReactDOM.unmountComponentAtNode(this.elementRef.nativeElement);
  }

}
