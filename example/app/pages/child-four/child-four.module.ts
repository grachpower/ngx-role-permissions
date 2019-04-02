import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildFourComponent } from './child-four.component';

import { NgxPermissionModule } from '../../../../lib/ngx-role-permissions/src/lib/ngx-role-permission.module';

@NgModule({
  imports: [
    CommonModule,
    NgxPermissionModule.forChild('childModule4', {
      elementOne: ['user', 'admin'],
      elementTwo: ['admin'],
    }),
  ],
  declarations: [ChildFourComponent],
  exports: [ChildFourComponent],
})
export class ChildFourModule { }
