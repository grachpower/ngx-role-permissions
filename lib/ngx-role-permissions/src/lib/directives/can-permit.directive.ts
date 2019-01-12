import { Directive, Input, ViewContainerRef, TemplateRef, Optional, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class CanPermitDirective implements OnDestroy {
  private destroySubj$ = new Subject();

  constructor(
    private permissionService: PermissionService,
    private _viewContainer: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    @Optional() @Inject(FEATURE_CONFIG_NAME_TOKEN) private featureName: string,
  ) {}

  @Input()
  set canPermit(elementName: string) {
    if (!!this.featureName) {
      this.permissionService.canAccessFeature(this.featureName, elementName)
        .pipe(takeUntil(this.destroySubj$))
        .subscribe((res: boolean) => {
          if (!!res && !!this._templateRef) {
            this._viewContainer.clear();
            this._viewContainer.createEmbeddedView(this._templateRef, {});
          } else {
            this._viewContainer.clear();
          }
        });
    } else {
      this.permissionService.canAccess(elementName)
        .pipe(takeUntil(this.destroySubj$))
        .subscribe((res: boolean) => {
          if (!!res && !!this._templateRef) {
            this._viewContainer.clear();
            this._viewContainer.createEmbeddedView(this._templateRef, {});
          } else {
            this._viewContainer.clear();
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroySubj$.next();
    this.destroySubj$.complete();
  }
}
