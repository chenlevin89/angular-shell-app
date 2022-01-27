import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VueWrapperComponent } from './vue-wrapper.component';
import {RouterModule, Routes} from '@angular/router';

const routes:Routes = [
  {
    path: '',
    component: VueWrapperComponent
  }
]

@NgModule({
  declarations: [
    VueWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class VueWrapperModule { }
