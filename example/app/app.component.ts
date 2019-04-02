import { Component, OnInit } from '@angular/core';
import {PermissionService} from '../../lib/ngx-role-permissions/src/lib/services/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngx-role-permissions';

  constructor(
    private permissionService: PermissionService,
  ) {}

  public ngOnInit(): void {
    this.permissionService.setRoles([
      'user',
    ]);

    // append role
    this.permissionService.addRole('admin');

    // remove role
    this.permissionService.removeRole('admin');
  }
}
