import { Component } from '@angular/core';
import { PermissionService } from 'ngx-role-permission';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-role-permissions';

  constructor(
    private permissionService: PermissionService,
  ) {
    permissionService.setRoles([
      'user',
    ]);
  }
}
