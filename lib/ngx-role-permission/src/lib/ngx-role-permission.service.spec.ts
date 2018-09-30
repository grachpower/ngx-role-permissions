import { TestBed } from '@angular/core/testing';

import { NgxRolePermissionService } from './ngx-role-permission.service';

describe('NgxRolePermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxRolePermissionService = TestBed.get(NgxRolePermissionService);
    expect(service).toBeTruthy();
  });
});
