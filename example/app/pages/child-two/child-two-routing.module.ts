import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'ngx-role-permissions';

import { ChildViewTwoComponent } from './child-view-two/child-view-two.component';
import { ChildViewThreeComponent } from './child-view-three/child-view-three.component';

const routes: Routes = [
  {
    path: 'one',
    component: ChildViewTwoComponent,
    canActivate: [PermissionGuard],
    data: {
      permissionConfig: {
        permissionElement: 'childInnerOne',
        redirectRoute: '/child1',
      }
    }
  },
  {
    path: 'two',
    component: ChildViewThreeComponent,
    canActivate: [PermissionGuard],
    data: {
      permissionConfig: {
        permissionElement: 'childInnerTwo',
        redirectRoute: '/child1',
      },
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildTwoRoutingModule { }
