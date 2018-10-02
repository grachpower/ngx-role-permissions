import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildViewTwoComponent } from './child-view-two/child-view-two.component';

const routes: Routes = [
  {
    path: '',
    component: ChildViewTwoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildTwoRoutingModule { }
