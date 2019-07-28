import { NgModule } from '@angular/core';

import { CanNotPermitDirective } from './directives/can-not-permit.directive';
import { CanPermitDirective } from './directives/can-permit.directive';

@NgModule({
    declarations: [
        CanPermitDirective,
        CanNotPermitDirective,
    ],
    exports: [
        CanPermitDirective,
        CanNotPermitDirective,
    ]
})
export class NgxPermissionDirectivedModule {}
