import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMgtComponent } from './customer-mgt.component';

describe('CustomerMgtComponent', () => {
  let component: CustomerMgtComponent;
  let fixture: ComponentFixture<CustomerMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
