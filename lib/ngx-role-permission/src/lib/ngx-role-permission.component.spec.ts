import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRolePermissionComponent } from './ngx-role-permission.component';

describe('NgxRolePermissionComponent', () => {
  let component: NgxRolePermissionComponent;
  let fixture: ComponentFixture<NgxRolePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRolePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
