import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'ngx-role-permission';


const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/child/child.module#ChildModule',
    canLoad: [PermissionGuard],
    data: {
      permissionElement: 'child',
    }
  },
  {
    path: 'child',
    loadChildren: './pages/child-two/child-two.module#ChildTwoModule',
    canLoad: [PermissionGuard],
    data: {
      permissionElement: 'child-two',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
