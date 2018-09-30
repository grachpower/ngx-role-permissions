import { ModuleWithProviders, NgModule } from '@angular/core';

import { CanPermitDirective } from './directives/can-permit.directive';

@NgModule({
  imports: [],
  declarations: [
    CanPermitDirective,
  ],
  exports: [
    CanPermitDirective,
  ]
})
export class NgxPermissionModule {
  public forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxPermissionModule,
      providers: [],
    };
  }

  public forChild(): ModuleWithProviders {
    return {
      ngModule: NgxPermissionModule,
      providers: [],
    };
  }
}
