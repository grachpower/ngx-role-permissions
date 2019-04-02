import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildFourComponent } from './child-four.component';

describe('ChildFourComponent', () => {
  let component: ChildFourComponent;
  let fixture: ComponentFixture<ChildFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
