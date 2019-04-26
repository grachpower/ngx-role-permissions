import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Child3Component} from './child3.component';

const routes: Routes = [
  {
    path: '**',
    component: Child3Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Child3RoutingModule { }
