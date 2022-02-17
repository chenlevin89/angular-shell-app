import {DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {API_OPTIONS_TOKEN, LayoutModule, LoaderModule, StyleVersion, STYLE_VERSION_TOKEN, SvgModule} from '@ironsource/fusion-ui';
import {environment} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
