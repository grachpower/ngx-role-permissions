import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildViewTwoComponent } from './child-view-two/child-view-two.component';
import { ChildViewThreeComponent } from './child-view-three/child-view-three.component';
import {PermissionGuard} from '../../../../lib/ngx-role-permissions/src/lib/guards/permission.guard';

const routes: Routes = [
  {
    path: 'one',
    component: ChildViewTwoComponent,
    canActivate: [PermissionGuard],
    data: {
      permissionElement: 'childInnerOne',
    }
  },
  {
    path: 'two',
    component: ChildViewThreeComponent,
    canActivate: [PermissionGuard],
    data: {
      permissionElement: 'childInnerTwo',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildTwoRoutingModule { }
