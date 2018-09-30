import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { PERMISSION_CONFIG_TOKEN } from '../tokens/permission-config.token';
import { PermissionConfigInterface } from '../interface/permissionConfig.interface';

@Injectable()
export class PermissionService {
  private initialRoles = [];
  private roles$ = new BehaviorSubject<string[]>(this.initialRoles);

  constructor(
    @Inject(PERMISSION_CONFIG_TOKEN) private permissionConfigs: PermissionConfigInterface[],
  ) { }

  public setRoles(roles: string[]): void {
    this.roles$.next(roles);
  }

  public getRoles$(): Observable<string[]> {
    return this.roles$;
  }

  public get config$(): Observable<PermissionConfigInterface> {
    return of(this.permissionConfigs.reduce((acc, curr: PermissionConfigInterface) => ({...acc, ...curr}), {}));
  }

  public canAccess$(pageOrElement: string): Observable<boolean> {
    return this.config$.pipe(
      withLatestFrom(this.roles$),
      map(([config, roles]: [PermissionConfigInterface, string[]]) => {
        if (!config[pageOrElement]) {
          return false;
        }

        const elementRoles = config[pageOrElement];

        return (elementRoles as Array<string>).some((role: string) => roles.includes(role));
      }),
    );
  }

}
