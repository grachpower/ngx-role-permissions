import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PermissionService } from '../services/permission.service';

@Injectable()
export class PermissionGuard implements CanActivate, CanLoad {
  constructor(
    private permissionService: PermissionService,
  ) {}

  public canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    if (!(next.data.permissionElement)) {
      console.error('No permissionElement defined for current guard');

      return of(false);
    }

    return this.permissionService.canAccess$(next.data.permissionElement);
  }

  public canLoad(route: Route): Observable<boolean> {
    if (!(route.data.permissionElement)) {
      console.error('No permissionElement defined for current guard');

      return of(false);
    }

    return this.permissionService.canAccess$(route.data.permissionElement);
  }
}
