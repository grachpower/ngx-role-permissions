import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard, INITIAL_ROLES } from 'ngx-role-permissions';


const routes: Routes = [
  {
    path: 'child1',
    loadChildren: './pages/child/child.module#ChildModule',
    canLoad: [PermissionGuard],
    data: {
      permissionConfig: {
        permissionElement: 'childOne',
        redirectRoute: '/dashboard',
      }
    }
  },
  {
    path: 'child2',
    loadChildren: './pages/child-two/child-two.module#ChildTwoModule',
    canLoad: [PermissionGuard],
    data: {
      permissionConfig: {
        permissionElement: 'childTwo',
        redirectRoute: '/dashboard',
      }
    }
  },
  {
    path: 'child3',
    loadChildren: './pages/child3/child3.module#Child3Module',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [
  //   {
  //     provide: INITIAL_ROLES,
  //     multi: true,
  //     useValue: ['user'],
  //   }
  // ],
})
export class AppRoutingModule { }
