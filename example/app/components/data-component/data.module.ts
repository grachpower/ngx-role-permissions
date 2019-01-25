import { NgModule } from '@angular/core';
import { DataComponent } from './data.component';
import { NgxPermissionModule } from 'ngx-role-permissions';

@NgModule({
  imports: [NgxPermissionModule],
  declarations: [DataComponent],
  exports: [DataComponent],
})
export class DataModule {}
