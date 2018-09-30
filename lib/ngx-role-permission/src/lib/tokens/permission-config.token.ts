import { InjectionToken } from '@angular/core';

import { PermissionConfigInterface } from '../interface/permissionConfig.interface';

export const PERMISSION_CONFIG_TOKEN = new InjectionToken<PermissionConfigInterface>('PERMISSION_CONFIG_TOKEN');
