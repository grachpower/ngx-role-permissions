import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PermissionDataType } from '../interface/permissionConfig.interface';
import { PermissionElementDTO } from '../models/element';

@Injectable({
  providedIn: 'root',
})
export class PermissionsStoreService {
  public _initialRoles = [];
  public _roles$ = new BehaviorSubject<string[]>(this._initialRoles);
  public _configs$ = new BehaviorSubject<PermissionDataType>([]);
  private configNamesSet = new Set<string>([]);

  public updateConfig(permissionConfigs: PermissionDataType[]): void {
    this._configs$.next(this.concatAllConfigs([this._configs$.value, ...permissionConfigs]));
    const configNameList = this._configs$.value.map(({name}: PermissionElementDTO) => name);
    this.configNamesSet = new Set(configNameList);
  }

  public hasElement(name: string): boolean {
    return this.configNamesSet.has(name);
  }

  public getElement(name: string): PermissionElementDTO {
    return this._configs$.value.find((element: PermissionElementDTO) => element.name === name);
  }

  private concatAllConfigs(configs: PermissionDataType[]): PermissionDataType {
    return configs.reduce((acc: PermissionDataType, curr: PermissionDataType) => {
        return this.concatTwoConfigs(acc, curr);
    }, [] as PermissionDataType);
  }

  private concatTwoConfigs(originalConfig: PermissionDataType, newConfig: PermissionDataType): PermissionDataType {
    const prevConfKeys = originalConfig.map((element: PermissionElementDTO) => element.name);
    const newConfigKeys = newConfig.map((element: PermissionElementDTO) => element.name);
    const prevConfSet = new Set(prevConfKeys);

    newConfigKeys.forEach((key: string) => {
      if (prevConfSet.has(key)) {
        throw new Error(`Element '${key}' already defined`);
      }
    });

    return [...originalConfig, ...newConfig];
  }


}
