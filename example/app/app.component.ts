import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'ngx-role-permissions';

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
    this.permissionService.getRoles().subscribe((roles: string[]) => {
      console.log(roles);
    });

    this.permissionService.config.subscribe((config) => {
      console.log(config);
    });

    this.permissionService.setRoles([
      'user',
    ]);

    // append role
    this.permissionService.addRole('admin');

    // remove role
    this.permissionService.removeRole('admin');
  }
}
