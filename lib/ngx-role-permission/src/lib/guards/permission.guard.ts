import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PermissionService } from '../services/permission.service';

const nameProp = 'permissionElement';

@Injectable()
export class PermissionGuard implements CanActivate, CanLoad {
  public static featureName = undefined;

  public static forPage(pageName: string): typeof PermissionGuard {
    PermissionGuard.featureName = pageName;

    return this;
  }

  constructor(
    private permissionService: PermissionService,
  ) {}

  public canActivate(): Observable<boolean> {
    this.permissionService.config$.subscribe((val) => console.log(val));

    if (!(PermissionGuard.featureName)) {
      console.error('No pageName defined for current guard');

      return of(false);
    }

    return this.permissionService.canAccess$(PermissionGuard.featureName);
  }

  public canLoad(): Observable<boolean> {
    return this.canActivate();
  }
}
