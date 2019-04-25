import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionModule, doorlock } from 'ngx-role-permissions';

import { ChildTwoRoutingModule } from './child-two-routing.module';
import { ChildViewTwoComponent } from './child-view-two/child-view-two.component';
import { ChildViewThreeComponent } from './child-view-three/child-view-three.component';
import { PermElementTypes } from '../../elements.enum';

@NgModule({
  imports: [
    CommonModule,
    ChildTwoRoutingModule,
    NgxPermissionModule.withElements([
      doorlock(PermElementTypes.childInnerOne).unlockWith(['admin']),
      doorlock(PermElementTypes.childInnerTwo).unlockWith(['admin', 'user']),
      doorlock(PermElementTypes.elementOne).unlockWith(['admin', 'user']),
      doorlock(PermElementTypes.elementTwo).unlockWith(['admin']),
      doorlock(PermElementTypes.pageElement).unlockWith(['admin']),
    ]),
  ],
  declarations: [ChildViewTwoComponent, ChildViewThreeComponent]
})
export class ChildTwoModule { }
