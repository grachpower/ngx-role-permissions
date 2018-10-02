import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildTwoRoutingModule } from './child-two-routing.module';
import { ChildViewTwoComponent } from './child-view-two/child-view-two.component';

@NgModule({
  imports: [
    CommonModule,
    ChildTwoRoutingModule,
  ],
  declarations: [ChildViewTwoComponent]
})
export class ChildTwoModule { }
