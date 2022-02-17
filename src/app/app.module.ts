import {DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {API_OPTIONS_TOKEN, LayoutModule, LoaderModule, StyleVersion, STYLE_VERSION_TOKEN, SvgModule} from '@ironsource/fusion-ui';
import {environment} from '../environments/environment';

import { AppComponent } from './app.component';
import {DynamicRoutingModule} from './dynamic-routing.module';

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
    {provide: STYLE_VERSION_TOKEN, useFactory: () => StyleVersion.V1},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
