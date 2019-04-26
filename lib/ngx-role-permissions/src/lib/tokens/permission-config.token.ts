import { InjectionToken } from '@angular/core';
import { PermissionElement } from '../models/element';

export const PERMISSION_CONFIG_TOKEN = new InjectionToken<PermissionElement[]>('PERMISSION_CONFIG_TOKEN');
