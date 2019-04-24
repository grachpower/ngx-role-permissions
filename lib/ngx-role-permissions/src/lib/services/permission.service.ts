import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PERMISSION_CONFIG_TOKEN } from '../tokens/permission-config.token';
import { PermissionConfigInterface } from '../interface/permissionConfig.interface';

@Injectable()
export class PermissionService {
  private _initialRoles = [];
  private _roles$ = new BehaviorSubject<string[]>(this._initialRoles);
  private _configs$ = new BehaviorSubject<PermissionConfigInterface>({});
  private _featureConfigs = new BehaviorSubject<PermissionConfigInterface>({});

  constructor(
    @Inject(PERMISSION_CONFIG_TOKEN) private permissionConfigs: PermissionConfigInterface[],
  ) {}

  public clearRoles(): void {
    this._roles$.next(null);
  }

  public setRoles(roles: string[]): void {
    this._roles$.next(roles);
  }

  public addRole(role: string): void {
    const roles: string[] = this._roles$.value;

    if (roles.includes(role)) {
      return;
    }

    this._roles$.next([...roles, role]);
  }

  public removeRole(role: string): void {
    const roles: string[] = this._roles$.value;

    if (!roles.includes(role)) {
      return;
    }

    this._roles$.next(roles.filter((availableRole: string) => role !== availableRole));
  }

  public getRoles(): Observable<string[]> {
    return this._roles$;
  }

  public get config(): Observable<PermissionConfigInterface> {
    return this._configs$.asObservable();
  }

  public _updateConfig(permissionConfigs: PermissionConfigInterface[]): void {
    this._configs$.next(permissionConfigs.reduce((acc, curr: PermissionConfigInterface) => ({...acc, ...curr}), {}));
  }

  public _addFeatureConfig(featureName: string, permissionConfig: PermissionConfigInterface): void {
    this._featureConfigs.next({
      ...this._featureConfigs.value,
      [featureName]: permissionConfig,
    });
  }

  public canAccess(pageOrElement: string): Observable<boolean> {
    return combineLatest(this.config, this._roles$).pipe(
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
    return combineLatest(this._featureConfigs, this._roles$).pipe(
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
