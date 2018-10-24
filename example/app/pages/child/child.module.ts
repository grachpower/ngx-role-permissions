import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionModule } from 'ngx-role-permissions';

import { ChildRoutingModule } from './child-routing.module';
import { ChildViewComponent } from './child-view/child-view.component';

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
