import {CurrencyPipe, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {LayoutModule} from '@ironsource/fusion-ui/components/layout/v1';
import {SvgModule} from '@ironsource/fusion-ui/components/svg';
import {LoaderModule} from '@ironsource/fusion-ui/components/loader/v2'
import { AppComponent } from './app.component';
import {DynamicRoutingModule} from './dynamic-routing.module';
import {API_OPTIONS_TOKEN} from '@ironsource/fusion-ui/services/api';
import {ClonePipe} from '@ironsource/fusion-ui/pipes/clone';
import {CapitalizePipe} from '@ironsource/fusion-ui/pipes/string';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    SvgModule.forRoot({assetsPath: environment.assetsPath}),
    LoaderModule
  ],
  providers: [
    {provide: API_OPTIONS_TOKEN, useFactory: () => ({autoAuthHeader: true})},
    DatePipe,
    ClonePipe,
    CurrencyPipe,
    CapitalizePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
