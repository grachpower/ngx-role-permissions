import { InjectionToken } from '@angular/core';

/**
 *
 * Should be used as multi token to provide roles on startup
 *
 * @NgModule({
 *     ...
 *     providers: [
 *         {
 *             provide: INITIAL_ROLES,
 *             multi: true,
 *             useValue: ['admin', 'user'],
 *         }
 *     ]
 * })
 */
export const INITIAL_ROLES = new InjectionToken<string[]>('PERMISSIONS__INITIAL_ROLES');
