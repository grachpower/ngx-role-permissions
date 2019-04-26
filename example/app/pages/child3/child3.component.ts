import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'ngx-role-permissions';

@Component({
  selector: 'app-child3',
  templateUrl: './child3.component.html',
  styleUrls: ['./child3.component.css']
})
export class Child3Component implements OnInit {

  constructor(
    private permission: PermissionService,
  ) { }

  ngOnInit() {
  }

}
