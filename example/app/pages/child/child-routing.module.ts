import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildViewComponent } from './child-view/child-view.component';

const routes: Routes = [
  {
    path: '',
    component: ChildViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule { }
