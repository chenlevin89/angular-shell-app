import {AfterViewInit, Component, ElementRef, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vue-wrapper',
  templateUrl: './vue-wrapper.component.html',
  styleUrls: ['./vue-wrapper.component.scss']
})
export class VueWrapperComponent implements AfterViewInit, OnDestroy {

  private unmount = () => {};

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.activatedRoute.data
      .subscribe(async ({loadMetadata, component, basename}) => {
        this.unmount();
        const {createVueElement,componentsPath} = await loadMetadata();
        this.unmount = createVueElement({path:componentsPath[component], basename, elementRef:this.elementRef.nativeElement})
      });
  }

  ngOnDestroy(): void {
    this.unmount();
  }


}
