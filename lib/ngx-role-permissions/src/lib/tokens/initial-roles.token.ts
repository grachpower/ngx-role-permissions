import { InjectionToken } from '@angular/core';

/**
 * Multi provided token
 *
 * @MgModule({
 *     ...
 *     providers: [
 *         provide: INITIAL_ROLES,
 *         multi: true,
 *         useValue: ['admin', 'user'],
 *     ]
 * })
 */
export const INITIAL_ROLES = new InjectionToken<string[]>('PERMISSION_INITIAL_ROLES');
