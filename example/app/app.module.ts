import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChildThreeModule } from './pages/child-three/child-three.module';
import { ChildFourModule } from './pages/child-four/child-four.module';
import {NgxPermissionModule} from '../../lib/ngx-role-permissions/src/lib/ngx-role-permission.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPermissionModule.forRoot({
      childOne: ['admin', 'user'],
      childTwo: ['user'],
    }),
    ChildThreeModule,
    ChildFourModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
