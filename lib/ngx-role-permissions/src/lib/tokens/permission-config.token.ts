import { InjectionToken } from '@angular/core';
import { PermissionElementDTO } from '../models/element';

export const PERMISSION_CONFIG_TOKEN = new InjectionToken<PermissionElementDTO[]>('PERMISSION_CONFIG_TOKEN');
