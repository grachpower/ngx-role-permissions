import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'ngx-role-permission';


const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/child/child.module#ChildModule',
    canLoad: [PermissionGuard.forPage('child')],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
