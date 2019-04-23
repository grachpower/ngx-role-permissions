import { Injectable, Optional, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { PermissionService } from '../services/permission.service';
import { FEATURE_CONFIG_NAME_TOKEN } from '../tokens/feature-config.token';

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
    @Optional() @Inject(FEATURE_CONFIG_NAME_TOKEN) private featureName: string,
  ) {}

  public canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const routeConfig = this.mapParamsToData(next.data.permissionElement, next.data.permissionConfig);

    if (!routeConfig.permissionElement) {
      console.error('No permissionElement defined for current guard');

      return of(false);
    }

    return this.getCanAccess(this.featureName, routeConfig)
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

    return this.getCanAccess(this.featureName, routeConfig)
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

  private getCanAccess(featureName: string | null, guardConfig: RouteParamsConfig): Observable<boolean >{
    if (!!featureName) {
      return this.permissionService.canAccessFeature(this.featureName, guardConfig.permissionElement).pipe(first());
    } else {
      return this.permissionService.canAccess(guardConfig.permissionElement).pipe(first());
    }
  }
}
