import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PERMISSION_CONFIG_TOKEN } from '../tokens/permission-config.token';
import { PermissionDataType } from '../interface/permissionConfig.interface';
import { PermissionsStoreService } from './permissions-store.service';

@Injectable()
export class PermissionService {
  constructor(
    private permissionStore: PermissionsStoreService,
    @Optional() @Inject(PERMISSION_CONFIG_TOKEN) permissionConfigs: PermissionDataType[],
  ) {
    if (permissionConfigs) {
      this.permissionStore.updateConfig(permissionConfigs);
    } else {
      throw new Error('No permission config defined');
    }
  }

  public clearRoles(): void {
    this.permissionStore._roles$.next(null);
  }

  public setRoles(roles: string[]): void {
    this.permissionStore._roles$.next(roles);
  }

  public addRole(role: string): void {
    const roles: string[] = this.permissionStore._roles$.value;

    if (roles.includes(role)) {
      return;
    }

    this.permissionStore._roles$.next([...roles, role]);
  }

  public removeRole(role: string): void {
    const roles: string[] = this.permissionStore._roles$.value;

    if (!roles.includes(role)) {
      return;
    }

    this.permissionStore._roles$.next(roles.filter((availableRole: string) => role !== availableRole));
  }

  public getRoles(): Observable<string[]> {
    return this.permissionStore._roles$;
  }

  public get config(): Observable<PermissionDataType> {
    return this.permissionStore._configs$.asObservable();
  }

  public canAccess(element: string): Observable<boolean> {
    return combineLatest(this.config, this.permissionStore._roles$).pipe(
      map(([config, roles]: [PermissionDataType, string[]]) => {
        if (!this.permissionStore.hasElement(element)) {
          console.error('Cannot find element ', element);
          return false;
        }

        const permElement = this.permissionStore.getElement(element);
        const elementKeys = permElement.keys;

        if (permElement.unlockable) {
          return elementKeys.some((role: string) => roles.includes(role));
        } else {
          return !elementKeys.some((role: string) => roles.includes(role));
        }
      }),
    );
  }
}
