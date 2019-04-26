import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPermissionModule, INITIAL_ROLES, LockTypes, PERMISSION_CONFIG_TOKEN } from 'ngx-role-permissions';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataModule } from './components/data-component/data.module';
import { PermElementTypes } from './elements.enum';
import { doorlock } from 'lib/ngx-role-permissions/src/public_api';

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

// const elements = [
//   doorlock(PermElementTypes.CHILD_TWO).unlockWith(['user']),,
//   doorlock(PermElementTypes.CHILD_TWO).unlockWith(['user']),,
//   doorlock(PermElementTypes.CHILD_TWO).unlockWith(['user']),,
//   doorlock(PermElementTypes.PAGE_ELEMENT).unlockWith(['admin']),
//   doorlock(PermElementTypes.CHILD_ONE).lockWith(['user', 'admin']),
// ];

// const elements = [
//   {name: PermElementTypes.CHILD_TWO, unlockable: true, keys: ['user']},
//   {name: PermElementTypes.PAGE_ELEMENT, unlockable: true, keys: ['admin']},
//   {name: PermElementTypes.CHILD_ONE, unlockable: false, keys: ['user', 'admin']},
// ];

// console.log(elements);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule,
    NgxPermissionModule.withElements([
      {name: PermElementTypes.CHILD_TWO, lockType: LockTypes.UNLOCKABLE, keys: ['user']},
    ]),
  ],
  providers: [
    {
      provide: INITIAL_ROLES,
      multi: true,
      useValue: ['user'],
    },
    {
      provide: PERMISSION_CONFIG_TOKEN,
      multi: true,
      useValue: [
        doorlock(PermElementTypes.PAGE_ELEMENT).lockWith(['admin']),
        doorlock(PermElementTypes.CHILD_ONE).unlockWith(['user', 'admin']),
      ],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
