import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPermissionModule } from 'ngx-role-permission';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPermissionModule.forRoot({
      child: ['admin', 'user'],
      childTwo: ['user'],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
