import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { CanPermitDirective } from './directives/can-permit.directive';
import { PERMISSION_CONFIG_TOKEN } from './tokens/permission-config.token';
import { PermissionConfigInterface } from './interface/permissionConfig.interface';
import { PermissionService } from './services/permission.service';
import { PermissionGuard } from './guards/permission.guard';
import { FEATURE_CONFIG_NAME_TOKEN, FEATURE_CONFIG_VALUE_TOKEN } from './tokens/feature-config.token';

@NgModule({
  imports: [],
  declarations: [
    CanPermitDirective,
  ],
  providers: [
    PermissionGuard,
  ],
  exports: [
    CanPermitDirective,
  ]
})
export class NgxPermissionModule {
  constructor(
    permissionService: PermissionService,
    @Inject(PERMISSION_CONFIG_TOKEN) permissionConfigs: PermissionConfigInterface[],
    @Optional() @Inject(FEATURE_CONFIG_NAME_TOKEN) featureConfigName: string,
    @Optional() @Inject(FEATURE_CONFIG_VALUE_TOKEN) featureConfigValue: PermissionConfigInterface,
  ) {
    permissionService._updateConfig(permissionConfigs);

    console.log('init module');

    if (featureConfigName && featureConfigValue) {
      permissionService._addFeatureConfig(featureConfigName, featureConfigValue);
    }
  }

  public static forRoot(config: PermissionConfigInterface): ModuleWithProviders {
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

  public static forChild(featureName: string, config: PermissionConfigInterface): ModuleWithProviders {
    return {
      ngModule: NgxPermissionModule,
      providers: [
        // PermissionService,
        {
          provide: FEATURE_CONFIG_NAME_TOKEN,
          useValue: featureName,
        },
        {
          provide: FEATURE_CONFIG_VALUE_TOKEN,
          useValue: config,
        },
      ],
    };
  }
}
