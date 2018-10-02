import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildViewTwoComponent } from './child-view-two.component';

describe('ChildViewTwoComponent', () => {
  let component: ChildViewTwoComponent;
  let fixture: ComponentFixture<ChildViewTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildViewTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildViewTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
