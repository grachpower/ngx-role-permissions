import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPermissionModule } from 'ngx-role-permissions';

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
      childOne: ['admin', 'user'],
      childTwo: ['user'],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
