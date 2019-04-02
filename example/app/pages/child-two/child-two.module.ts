import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildTwoRoutingModule } from './child-two-routing.module';
import { ChildViewTwoComponent } from './child-view-two/child-view-two.component';
import { ChildViewThreeComponent } from './child-view-three/child-view-three.component';
import {NgxPermissionModule} from '../../../../lib/ngx-role-permissions/src/lib/ngx-role-permission.module';

@NgModule({
  imports: [
    CommonModule,
    ChildTwoRoutingModule,
    NgxPermissionModule.forChild('childModule2', {
      childInnerOne: ['admin'],
      childInnerTwo: ['admin', 'user'],
      elementOne: ['user', 'admin'],
      elementTwo: ['admin'],
    }),
  ],
  declarations: [ChildViewTwoComponent, ChildViewThreeComponent]
})
export class ChildTwoModule { }
