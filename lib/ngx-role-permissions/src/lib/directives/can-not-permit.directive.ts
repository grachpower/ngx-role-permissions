import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnDestroy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { SubscriptionLike } from 'rxjs';

import { PermissionService } from '../services/permission.service';

/**
 * Structural directive
 *
 * Usage:
 * <my-comp *canNotPermit="elementName"></my-comp>
 */
@Directive({
  selector: '[canNotPermit]',
})
export class CanNotPermitDirective implements OnChanges, OnDestroy {
  private permissionSubscription: SubscriptionLike;

  constructor(
    private permissionService: PermissionService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {}

  @Input() canNotPermit: string;

  public ngOnChanges(changes: SimpleChanges): void {
    this.initPermissionCheck(changes.canNotPermit.currentValue);
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

    this.permissionSubscription = this.permissionService.canAccess(elementName)
      .subscribe((res: boolean) => {
        if (!!res && !!this.templateRef) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(this.templateRef, {});
        }
      });
  }
}
