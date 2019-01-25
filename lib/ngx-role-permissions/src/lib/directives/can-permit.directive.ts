import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  Optional,
  Inject,
  OnDestroy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { SubscriptionLike } from 'rxjs';

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
export class CanPermitDirective implements OnChanges, OnDestroy {
  private permissionSubscription: SubscriptionLike;

  constructor(
    private permissionService: PermissionService,
    private _viewContainer: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    @Optional() @Inject(FEATURE_CONFIG_NAME_TOKEN) private featureName: string,
  ) {}

  @Input() canPermit: string;

  public ngOnChanges(changes: SimpleChanges): void {
    this.initPermissionCheck(changes.canPermit.currentValue);
  }

  public ngOnDestroy(): void {
    this.permissionSubscription.unsubscribe();
    this.permissionSubscription = null;
  }

  private initPermissionCheck(elementName: string): void {
    if (!!this.permissionSubscription) {
      this.permissionSubscription.unsubscribe();
      this.permissionSubscription = null;
    }

    if (!!this.featureName) {
      this.permissionSubscription = this.permissionService.canAccessFeature(this.featureName, elementName)
        .subscribe((res: boolean) => {
          if (!!res && !!this._templateRef) {
            this._viewContainer.clear();
            this._viewContainer.createEmbeddedView(this._templateRef, {});
          } else {
            this._viewContainer.clear();
          }
        });
    } else {
      this.permissionSubscription = this.permissionService.canAccess(elementName)
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
}
