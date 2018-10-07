import { Injectable, Optional, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { PermissionService } from '../services/permission.service';
import { FEATURE_CONFIG_NAME_TOKEN } from '../tokens/feature-config.token';

@Injectable()
export class PermissionGuard implements CanActivate, CanLoad {
  constructor(
    private permissionService: PermissionService,
    @Optional() @Inject(FEATURE_CONFIG_NAME_TOKEN) private featureName: string,
  ) {}

  public canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    if (!(next.data.permissionElement)) {
      console.error('No permissionElement defined for current guard');

      return of(false);
    }

    const permissionElementName = next.data.permissionElement;

    if (this.featureName) {
      return this.permissionService.canAccessFeature$(this.featureName, permissionElementName).pipe(first());
    }

    return this.permissionService.canAccess$(permissionElementName).pipe(first());
  }

  public canLoad(route: Route): Observable<boolean> {
    if (!(route.data.permissionElement)) {
      console.error('No permissionElement defined for current guard');

      return of(false);
    }

    const permissionElementName = route.data.permissionElement;

    if (this.featureName) {
      return this.permissionService.canAccessFeature$(this.featureName, permissionElementName).pipe(first());
    } else {
      return this.permissionService.canAccess$(permissionElementName).pipe(first());
    }
  }
}
