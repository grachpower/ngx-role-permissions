import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'ngx-role-permissions';


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
  },
  {
    path: 'child3',
    loadChildren: './pages/child3/child3.module#Child3Module',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
