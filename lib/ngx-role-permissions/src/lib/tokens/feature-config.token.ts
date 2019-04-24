import { InjectionToken } from '@angular/core';
import {PermissionConfigInterface} from '../interface/permissionConfig.interface';

export const FEATURE_CONFIG_NAME_TOKEN = new InjectionToken<string>('FEATURE_CONFIG_NAME');
export const FEATURE_PERMISSION_CONFIG = new InjectionToken<[string, PermissionConfigInterface]>('FEATURE_PERMISSION_CONFIG');
