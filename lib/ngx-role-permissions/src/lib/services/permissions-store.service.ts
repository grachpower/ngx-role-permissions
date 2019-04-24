import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PermissionConfigInterface } from '../interface/permissionConfig.interface';

@Injectable({
  providedIn: 'root',
})
export class PermissionsStoreService {
  public _initialRoles = [];
  public _roles$ = new BehaviorSubject<string[]>(this._initialRoles);
  public _configs$ = new BehaviorSubject<PermissionConfigInterface>({});
  public _featureConfigs = new BehaviorSubject<PermissionConfigInterface>({});

  public updateConfig(permissionConfigs: PermissionConfigInterface[]): void {
    this._configs$.next(permissionConfigs.reduce((acc, curr: PermissionConfigInterface) => ({...acc, ...curr}), {}));
  }

  public addFeatureConfig(featureName: string, permissionConfig: PermissionConfigInterface): void {
    this._featureConfigs.next({
      ...this._featureConfigs.value,
      [featureName]: permissionConfig,
    });
  }
}
