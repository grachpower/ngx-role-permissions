import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionModule } from 'ngx-role-permission';

import { ChildTwoRoutingModule } from './child-two-routing.module';
import { ChildViewTwoComponent } from './child-view-two/child-view-two.component';
import { ChildViewThreeComponent } from './child-view-three/child-view-three.component';

@NgModule({
  imports: [
    CommonModule,
    ChildTwoRoutingModule,
    NgxPermissionModule.forChild('childModule2', {
      childInnerOne: ['user'],
      childInnerTwo: ['admin', 'user'],
    }),
  ],
  declarations: [ChildViewTwoComponent, ChildViewThreeComponent]
})
export class ChildTwoModule { }
