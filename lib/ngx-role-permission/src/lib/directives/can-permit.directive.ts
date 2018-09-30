import { Directive } from '@angular/core';

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
  ) {}
}
