import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LayoutModule, SvgModule} from '@ironsource/fusion-ui';
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
    LayoutModule,
    SvgModule.forRoot({assetsPath: environment.assetsPath}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
