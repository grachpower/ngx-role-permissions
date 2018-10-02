import { Directive, Input, ViewContainerRef } from '@angular/core';

import { PermissionService } from '../services/permission.service';

/**
 * Structural directive
 *
 * Usage:
 * <my-comp *canPermit="elementName"></my-comp>
 */
@Directive({
  selector: '[canPermit]',
})
export class CanPermitDirective {
  constructor(
    private permissionService: PermissionService,
    private _viewContainer: ViewContainerRef,
  ) {}

  // @Input()
  // set canPermit(condition: any) {
  //   this._context.$implicit = this._context.ngIf = condition;
  //   this._updateView();
  // }
}
