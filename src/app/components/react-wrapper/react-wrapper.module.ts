import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactWrapperComponent } from './react-wrapper.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component:ReactWrapperComponent
  }
]

@NgModule({
  declarations: [
    ReactWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReactWrapperModule { }
