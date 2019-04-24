import { ModuleWithProviders, NgModule } from '@angular/core';

import { CanPermitDirective } from './directives/can-permit.directive';
import { CanNotPermitDirective } from './directives/can-not-permit.directive';
import { PERMISSION_CONFIG_TOKEN } from './tokens/permission-config.token';
import { PermissionConfigInterface } from './interface/permissionConfig.interface';
import { PermissionService } from './services/permission.service';
import { PermissionGuard } from './guards/permission.guard';
import { PermissionsStoreService } from './services/permissions-store.service';

@NgModule({
  declarations: [
    CanPermitDirective,
    CanNotPermitDirective,
  ],
  providers: [
    PermissionGuard,
    PermissionService,
  ],
  exports: [
    CanPermitDirective,
    CanNotPermitDirective,
  ]
})
export class NgxPermissionModule {
  public static forRoot(config: PermissionConfigInterface): ModuleWithProviders {
    return {
      ngModule: NgxPermissionModule,
      providers: [
        PermissionsStoreService,
        {
          provide: PERMISSION_CONFIG_TOKEN,
          useValue: config,
          multi: true,
        }
      ],
    };
  }

  public static forChild(config: PermissionConfigInterface): ModuleWithProviders {
    return {
      ngModule: NgxPermissionModule,
      providers: [
        {
          provide: PERMISSION_CONFIG_TOKEN,
          useValue: config,
          multi: true,
        }
      ],
    };
  }
}
