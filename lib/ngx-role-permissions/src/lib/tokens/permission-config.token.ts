import { InjectionToken } from '@angular/core';

import { PermissionDataType } from '../interface/permissionConfig.interface';

export const PERMISSION_CONFIG_TOKEN = new InjectionToken<PermissionDataType>('PERMISSION_CONFIG_TOKEN');
