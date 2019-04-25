import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPermissionModule, doorlock } from 'ngx-role-permissions';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataModule } from './components/data-component/data.module';
import { PermElementTypes } from './elements.enum';
import { INITIAL_ROLES } from '../../lib/ngx-role-permissions/src/lib/tokens/initial-roles.token';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule,
    NgxPermissionModule.withElements([
      doorlock(PermElementTypes.CHILD_ONE).unlockWith(['admin', 'user']),
      doorlock(PermElementTypes.CHILD_TWO).unlockWith(['user']),
      doorlock(PermElementTypes.PAGE_ELEMENT).unlockWith(['admin']),
    ]),
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
