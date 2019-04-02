import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildRoutingModule } from './child-routing.module';
import { ChildViewComponent } from './child-view/child-view.component';
import {NgxPermissionModule} from '../../../../lib/ngx-role-permissions/src/lib/ngx-role-permission.module';

@NgModule({
  imports: [
    CommonModule,
    ChildRoutingModule,
    NgxPermissionModule.forChild('childModule1', {
      myChildElement: ['admin'],
    })
  ],
  declarations: [ChildViewComponent],
})
export class ChildModule { }
