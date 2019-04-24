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

  public updateConfig(permissionConfigs: PermissionConfigInterface[]): void {
    this._configs$.next(this.concatAllConfigs([this._configs$.value, ...permissionConfigs]));
  }

  private concatAllConfigs(configs: PermissionConfigInterface[]): PermissionConfigInterface {
    return configs.reduce((acc: PermissionConfigInterface, curr: PermissionConfigInterface) => {
        return this.concatTwoConfigs(acc, curr);
    }, {} as PermissionConfigInterface);
  }

  private concatTwoConfigs(originalConfig: PermissionConfigInterface, newConfig: PermissionConfigInterface): PermissionConfigInterface {
    const prevConfKeys = Object.keys(originalConfig);
    const newConfigKeys = Object.keys(newConfig);
    const prevConfSet = new Set(prevConfKeys);

    newConfigKeys.forEach((key: string) => {
      if (prevConfSet.has(key)) {
        throw new Error(`Element '${key}' already defined`);
      }
    });

    return {...originalConfig, ...newConfig};
  }


}
