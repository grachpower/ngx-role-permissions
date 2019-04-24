import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { PermissionService } from '../services/permission.service';

interface RouteParamsConfig {
  permissionElement: string;
  redirectRoute: string;
}

function isNil(value: any): boolean {
  if (value === undefined || value === null) {
    return true;
  }

  return false;
}

@Injectable()
export class PermissionGuard implements CanActivate, CanLoad {
  constructor(
    private permissionService: PermissionService,
    private router: Router,
  ) {}

  public canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const routeConfig = this.mapParamsToData(next.data.permissionElement, next.data.permissionConfig);

    if (!routeConfig.permissionElement) {
      console.error('No permissionElement defined for current guard');

      return of(false);
    }

    return this.getCanAccess(routeConfig)
      .pipe(
        tap((canAccess: boolean) => {
          if (!canAccess && !isNil(routeConfig.redirectRoute)) {
            this.router.navigate([routeConfig.redirectRoute]);
          }
        }),
      );
  }

  public canLoad(route: Route): Observable<boolean> {
    const routeConfig = this.mapParamsToData(route.data.permissionElement, route.data.permissionConfig);

    if (!routeConfig.permissionElement) {
      console.error('No permissionElement defined for current guard');

      return of(false);
    }

    return this.getCanAccess(routeConfig)
      .pipe(
        tap((canAccess: boolean) => {
          if (!canAccess && !isNil(routeConfig.redirectRoute)) {
            this.router.navigate([routeConfig.redirectRoute]);
          }
        }),
      );
  }

  private mapParamsToData(permissionElementName: string, guardConfig: RouteParamsConfig): RouteParamsConfig {
    if (guardConfig) {
      return guardConfig;
    }

    if (permissionElementName) {
      return {
        permissionElement: permissionElementName,
        redirectRoute: null,
      };
    }
  }

  private getCanAccess(guardConfig: RouteParamsConfig): Observable<boolean> {
    return this.permissionService.canAccess(guardConfig.permissionElement).pipe(first());
  }
}
