import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockTypes, NgxPermissionModule } from 'ngx-role-permissions';

import { ChildRoutingModule } from './child-routing.module';
import { ChildViewComponent } from './child-view/child-view.component';
import { DataModule } from '../../components/data-component/data.module';
import { PermElementTypes } from '../../elements.enum';

@NgModule({
  imports: [
    CommonModule,
    ChildRoutingModule,
    DataModule,
    NgxPermissionModule.withElements([
      {name: PermElementTypes.MY_CHILD_ELEMENT, lockType: LockTypes.UNLOCKABLE, keys: ['admin']},
      {name: PermElementTypes.INVERSE_PERMITTER, lockType: LockTypes.LOCKABLE, keys: ['admin']},
    ])
  ],
  declarations: [ChildViewComponent],
})
export class ChildModule { }
