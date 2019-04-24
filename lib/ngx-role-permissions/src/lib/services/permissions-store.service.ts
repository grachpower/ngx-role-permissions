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
    this._configs$.next(
      permissionConfigs.reduce((acc, curr: PermissionConfigInterface) => ({...this._configs$.value, ...acc, ...curr}), {})
    );
  }
}
