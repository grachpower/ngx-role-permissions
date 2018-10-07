import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'ngx-role-permission';


const routes: Routes = [
  {
    path: 'child1',
    loadChildren: './pages/child/child.module#ChildModule',
    canLoad: [PermissionGuard],
    data: {
      permissionElement: 'childOne',
    }
  },
  {
    path: 'child2',
    loadChildren: './pages/child-two/child-two.module#ChildTwoModule',
    canLoad: [PermissionGuard],
    data: {
      permissionElement: 'childTwo',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
