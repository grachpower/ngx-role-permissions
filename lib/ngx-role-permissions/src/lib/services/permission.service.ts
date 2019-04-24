import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PERMISSION_CONFIG_TOKEN } from '../tokens/permission-config.token';
import { PermissionConfigInterface } from '../interface/permissionConfig.interface';
import { PermissionsStoreService } from './permissions-store.service';
import { FEATURE_PERMISSION_CONFIG } from '../tokens/feature-config.token';

@Injectable()
export class PermissionService {
  constructor(
    private permissionStore: PermissionsStoreService,
    @Optional() @Inject(PERMISSION_CONFIG_TOKEN) private permissionConfigs: PermissionConfigInterface[],
    @Optional() @Inject(FEATURE_PERMISSION_CONFIG) private featureConfigs: [string, PermissionConfigInterface][],
  ) {
    if (permissionConfigs) {
      this.permissionStore.updateConfig(permissionConfigs);
    }

    if (featureConfigs) {
      featureConfigs.forEach(([featureConfigName, featureConfig]: [string, PermissionConfigInterface]) => {
        this.permissionStore.addFeatureConfig(featureConfigName, featureConfig);
      });
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

  public get config(): Observable<PermissionConfigInterface> {
    return this.permissionStore._configs$.asObservable();
  }

  public canAccess(pageOrElement: string): Observable<boolean> {
    return combineLatest(this.config, this.permissionStore._roles$).pipe(
      map(([config, roles]: [PermissionConfigInterface, string[]]) => {
        if (!config[pageOrElement]) {
          return false;
        }

        const elementRoles = config[pageOrElement];

        if (!elementRoles) {
          return false;
        }

        return (elementRoles as Array<string>).some((role: string) => roles.includes(role));
      }),
    );
  }

  public canAccessFeature(featureName: string, pageOrElement: string): Observable<boolean> {
    return combineLatest(this.permissionStore._featureConfigs, this.permissionStore._roles$).pipe(
      map(([configs, roles]: [PermissionConfigInterface, string[]]) => {
        if (!configs[featureName]) {
          console.error(`No feature ${featureName} provided`);

          return false;
        }

        const featureConfig = configs[featureName];

        if (!featureConfig[pageOrElement]) {
          console.error(`No element ${pageOrElement} provided`);

          return false;
        }

        const elementRoles = featureConfig[pageOrElement];

        if (!elementRoles) {
          return false;
        }

        return (elementRoles as Array<string>).some((role: string) => roles.includes(role));
      }),
    );
  }
}
