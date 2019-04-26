import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPermissionModule, doorlock, PermissionGuard, INITIAL_ROLES } from 'ngx-role-permissions';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataModule } from './components/data-component/data.module';
import { PermElementTypes } from './elements.enum';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'child1',
//     loadChildren: './pages/child/child.module#ChildModule',
//     canLoad: [PermissionGuard],
//     data: {
//       permissionConfig: {
//         permissionElement: 'childOne',
//         redirectRoute: '/dashboard',
//       }
//     }
//   },
//   {
//     path: 'child2',
//     loadChildren: './pages/child-two/child-two.module#ChildTwoModule',
//     canLoad: [PermissionGuard],
//     data: {
//       permissionConfig: {
//         permissionElement: 'childTwo',
//         redirectRoute: '/dashboard',
//       }
//     }
//   },
//   {
//     path: 'child3',
//     loadChildren: './pages/child3/child3.module#Child3Module',
//   }
// ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule,
    NgxPermissionModule.withElements([
      doorlock(PermElementTypes.CHILD_TWO).unlockWith(['user']),
      doorlock(PermElementTypes.PAGE_ELEMENT).unlockWith(['admin']),
      doorlock(PermElementTypes.CHILD_ONE).lockWith(['user', 'admin']),
    ]),
    // RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: INITIAL_ROLES,
      multi: true,
      useValue: ['user'],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
