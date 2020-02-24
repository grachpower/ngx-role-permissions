import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, takeUntil} from 'rxjs/operators';

import { PERMISSION_CONFIG_TOKEN } from '../tokens/permission-config.token';
import { PermissionDataType } from '../interface/permissionConfig.interface';
import { PermissionsStoreService } from './permissions-store.service';
import { INITIAL_ROLES } from '../tokens/initial-roles.token';
import { LockTypes } from '../enums/locktypes.enum';

@Injectable()
export class PermissionService implements OnDestroy {
  private destroyed$ = new Subject<void>();
  private isDestroyed = false;

  constructor(
    private permissionStore: PermissionsStoreService,
    @Optional() @Inject(PERMISSION_CONFIG_TOKEN) permissionConfigs: PermissionDataType[],
    @Optional() @Inject(INITIAL_ROLES) initialRoles: string[][],
  ) {
    if (permissionConfigs) {
      this.permissionStore.updateConfig(permissionConfigs);
    } else {
      throw new Error('No permission config defined');
    }

    if (initialRoles) {
      const initialRolesFlatten = [].concat(...initialRoles);
      const rolesSet = new Set(initialRolesFlatten);
      this.setRoles(Array.from(rolesSet));
    }
  }

  public ngOnDestroy(): void {
    this.isDestroyed = true;
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public clearRoles(): void {
    if (this.isDestroyed) {
      return;
    }

    this.permissionStore._roles$.next(null);
  }

  public setRoles(roles: string[]): void {
    if (this.isDestroyed) {
      return;
    }

    this.permissionStore._roles$.next(roles);
  }

  public addRole(role: string): void {
    const roles: string[] = this.permissionStore._roles$.value;

    if (roles.includes(role)) {
      return;
    }

    if (this.isDestroyed) {
      return;
    }

    this.permissionStore._roles$.next([...roles, role]);
  }

  public removeRole(role: string): void {
    const roles: string[] = this.permissionStore._roles$.value;

    if (!roles.includes(role)) {
      return;
    }

    if (this.isDestroyed) {
      return;
    }

    this.permissionStore._roles$.next(roles.filter((availableRole: string) => role !== availableRole));
  }

  public getRoles(): Observable<string[]> {
    return this.permissionStore._roles$.asObservable()
      .pipe(
        takeUntil(this.destroyed$),
      );
  }

  public get config(): Observable<PermissionDataType> {
    return this.permissionStore._configs$.asObservable().pipe(
      takeUntil(this.destroyed$),
    );
  }

  public canAccess(element: string): Observable<boolean> {
    return this.permissionStore._roles$.pipe(
      map((roles: string[]) => {
        if (!this.permissionStore.hasElement(element)) {
          console.error('Cannot find element ', element);
          return false;
        }

        const permElement = this.permissionStore.getElement(element);
        const elementKeys = permElement.keys;
        const currentRolesKeys = new Set(roles);
        const elementHasRolesFromStore = elementKeys.some((role: string) => currentRolesKeys.has(role));

        switch (permElement.lockType) {
          case LockTypes.UNLOCKABLE:
            return elementHasRolesFromStore;
          case LockTypes.LOCKABLE:
            return !elementHasRolesFromStore;
          default:
            return elementHasRolesFromStore;
        }
      }),
      distinctUntilChanged(),
      takeUntil(this.destroyed$),
    );
  }
}
