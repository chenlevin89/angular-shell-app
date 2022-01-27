import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'app-react-wrapper',
  templateUrl: './react-wrapper.component.html',
  styleUrls: ['./react-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactWrapperComponent implements AfterViewInit, OnDestroy {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.activatedRoute.data
      .subscribe(async ({loadComponent, loadWrapper, basename}) => {
        ReactDOM.unmountComponentAtNode(this.elementRef.nativeElement);
        const [ReactWrapper, ReactComponent] = await Promise.all([loadWrapper(), loadComponent()]);
        const ReactElement = React.createElement(ReactWrapper, {basename},React.createElement(ReactComponent));
        ReactDOM.render(ReactElement, this.elementRef.nativeElement);
      });
  }

  ngOnDestroy(): void {
      ReactDOM.unmountComponentAtNode(this.elementRef.nativeElement);
  }

}
