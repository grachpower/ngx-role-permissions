import { Directive, Input, ViewContainerRef, TemplateRef, Optional, Inject, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';

import { PermissionService } from '../services/permission.service';
import { FEATURE_CONFIG_NAME_TOKEN } from '../tokens/feature-config.token';

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
    private cdRef: ChangeDetectorRef,
    @Optional() @Inject(FEATURE_CONFIG_NAME_TOKEN) private featureName: string,
  ) {}

  @Input()
  set canPermit(elementName: string) {
    if (!!this.featureName) {
      this.permissionService.canAccessFeature(this.featureName, elementName)
      .pipe(first())
      .subscribe((res: boolean) => {
        if (!!res && !!this._templateRef) {
          this._viewContainer.createEmbeddedView(this._templateRef, {});
        } {
          this._viewContainer.clear();
        }
      });
    } else {
      this.permissionService.canAccess(elementName)
      .pipe(first())
      .subscribe((res: boolean) => {
        if (!!res && !!this._templateRef) {
          this._viewContainer.createEmbeddedView(this._templateRef, {});
        } {
          this._viewContainer.clear();
        }
      });
    }
  }
}
