import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PubSubService} from '../../services/pub-sub.service';

@Component({
  selector: 'app-vue-wrapper',
  templateUrl: './vue-wrapper.component.html',
  styleUrls: ['./vue-wrapper.component.scss']
})
export class VueWrapperComponent implements AfterViewInit, OnInit, OnDestroy {

  private unmount = () => {};

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly elementRef: ElementRef,
    private readonly pubSubService:PubSubService) { }


  // Mock user auth do to env requirements
  ngOnInit(): void {
      localStorage.setItem('authServiceDB', '{"expiration":"2022-03-31","token":"YTg1OTEzZWFhN2NmOjE2NDg3MjA0NTU6N2E4ZWIyMDRhMjQwM2QyYTRiMjBiYTYyOTllOGFkOTA="}')
  }

  ngAfterViewInit(): void {
    this.activatedRoute.data
      .subscribe(async ({loadMetadata, component, basename}) => {
        this.unmount();
        this.pubSubService.notify({type:'loading', value:true});
        const {createVueElement,componentsPath} = await loadMetadata();
        this.pubSubService.notify({type:'loading', value:false});
        this.unmount = createVueElement({path:componentsPath[component], basename, elementRef:this.elementRef.nativeElement});
      });
  }

  ngOnDestroy(): void {
    this.unmount();
  }


}
