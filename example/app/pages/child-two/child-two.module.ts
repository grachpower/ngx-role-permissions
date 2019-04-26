import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockTypes, NgxPermissionModule } from 'ngx-role-permissions';

import { ChildTwoRoutingModule } from './child-two-routing.module';
import { ChildViewTwoComponent } from './child-view-two/child-view-two.component';
import { ChildViewThreeComponent } from './child-view-three/child-view-three.component';
import { PermElementTypes } from '../../elements.enum';

@NgModule({
  imports: [
    CommonModule,
    ChildTwoRoutingModule,
    NgxPermissionModule.withElements([
      {name: PermElementTypes.childInnerOne, lockType: LockTypes.UNLOCKABLE, keys: ['admin']},
      {name: PermElementTypes.childInnerTwo, lockType: LockTypes.UNLOCKABLE, keys: ['admin', 'user']},
      {name: PermElementTypes.elementOne, lockType: LockTypes.UNLOCKABLE, keys: ['admin', 'user']},
      {name: PermElementTypes.elementTwo, lockType: LockTypes.UNLOCKABLE, keys: ['admin']},
      // doorlock(PermElementTypes.pageElement).unlockWith(['admin']),
    ]),
  ],
  declarations: [ChildViewTwoComponent, ChildViewThreeComponent]
})
export class ChildTwoModule { }
