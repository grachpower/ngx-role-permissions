import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { first } from 'rxjs/operators';

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
    private _templateRef: TemplateRef<any>,
  ) {}

  @Input()
  set canPermit(elementName: string) {
    this.permissionService.canAccess$(elementName)
      .pipe(first())
      .subscribe((res: boolean) => {
        if (!!res && this._templateRef) {
          this._viewContainer.clear();
          this._viewContainer.createEmbeddedView(this._templateRef);
        } {
          this._viewContainer.clear();
        }
      });
  }
}
