import { ModuleWithProviders, NgModule } from '@angular/core';

import { PERMISSION_CONFIG_TOKEN } from './tokens/permission-config.token';
import { PermissionDataType } from './interface/permissionConfig.interface';
import { PermissionService } from './services/permission.service';
import { PermissionGuard } from './guards/permission.guard';
import { NgxPermissionDirectivedModule } from './permissions-directives.module';

@NgModule({
  imports: [
    NgxPermissionDirectivedModule,
  ],
  providers: [
    PermissionGuard,
  ],
  exports: [
    NgxPermissionDirectivedModule,
  ],
})
export class NgxPermissionWithElementsModule {
  constructor(
    private permissionService: PermissionService,
  ) {}
}

@NgModule({
  imports: [
    NgxPermissionDirectivedModule,
  ],
  providers: [
    PermissionGuard,
  ],
  exports: [
    NgxPermissionDirectivedModule,
  ],
})
export class NgxPermissionModule {
  public static withElements(config: PermissionDataType): ModuleWithProviders {
    return {
      ngModule: NgxPermissionWithElementsModule,
      providers: [
        PermissionService,
        {
          provide: PERMISSION_CONFIG_TOKEN,
          useValue: config,
          multi: true,
        }
      ],
    };
  }
}
