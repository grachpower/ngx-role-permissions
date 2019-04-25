import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPermissionModule } from 'ngx-role-permissions';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataModule } from './components/data-component/data.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule,
    NgxPermissionModule.withElements({
      childOne: ['admin', 'user'],
      childTwo: ['user'],
      pageElement: ['admin'],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
