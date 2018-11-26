import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'ngx-role-permissions';

@Component({
  selector: 'app-child-view-three',
  templateUrl: './child-view-three.component.html',
  styleUrls: ['./child-view-three.component.css']
})
export class ChildViewThreeComponent implements OnInit {
  constructor(
    private permissionService: PermissionService,
  ) {}

  public ngOnInit(): void {
    this.permissionService.setRoles(['admin', 'user']);
  }
}
