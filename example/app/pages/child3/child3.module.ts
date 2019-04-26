import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Child3RoutingModule } from './child3-routing.module';
import { Child3Component } from './child3.component';
import { NgxPermissionModule } from 'ngx-role-permissions';

@NgModule({
  imports: [
    CommonModule,
    Child3RoutingModule,
    NgxPermissionModule,
  ],
  declarations: [Child3Component]
})
export class Child3Module { }
