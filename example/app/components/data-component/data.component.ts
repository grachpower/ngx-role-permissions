import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PermissionService } from 'ngx-role-permissions';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent implements OnInit, OnDestroy {
  @Input() elementName: string;
  @Input() role: string;

  private destroySubj$ = new Subject<void>();

  constructor(
    private permissionService: PermissionService
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.destroySubj$.next();
    this.destroySubj$.complete();
  }

  public addRoleTester(): void {
    this.permissionService.addRole(this.role);
  }

  public removeRoleTester(): void {
    this.permissionService.removeRole(this.role);
  }
}
