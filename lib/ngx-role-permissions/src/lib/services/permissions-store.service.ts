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

  private concatTwoConfigs(originalConfig: PermissionConfigInterface, configTwo: PermissionConfigInterface): PermissionConfigInterface {
    const firstKeys = Object.keys(originalConfig);
    const lastKeys = Object.keys(originalConfig);

    const firstSet = new Set(firstKeys);

    lastKeys.forEach((key: string) => {
      if (firstSet.has(key)) {
        throw new Error(`Element '${key}' already defined`);
      }
    });

    return {...originalConfig, ...configTwo};
  }


}
