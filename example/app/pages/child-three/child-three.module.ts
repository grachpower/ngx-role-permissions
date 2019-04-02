import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildThreeComponent } from './child-three.component';

import { NgxPermissionModule } from '../../../../lib/ngx-role-permissions/src/lib/ngx-role-permission.module';

@NgModule({
  imports: [
    CommonModule,
    NgxPermissionModule.forChild('childModule3', {
      elementOne: ['user', 'admin'],
      elementTwo: ['admin'],
    }),
  ],
  declarations: [ChildThreeComponent],
  exports: [ChildThreeComponent],
})
export class ChildThreeModule { }
