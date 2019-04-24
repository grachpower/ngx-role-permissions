import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPermissionModule } from 'ngx-role-permissions';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataModule } from './components/data-component/data.module';
import { INITIAL_ROLES } from '../../lib/ngx-role-permissions/src/lib/tokens/initial-roles.token';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule,
    NgxPermissionModule.forRoot({
      childOne: ['admin', 'user'],
      childTwo: ['user'],
      pageElement: ['admin'],
    }),
  ],
  providers: [
    {
      provide: INITIAL_ROLES,
      multi: true,
      useValue: ['user'],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
