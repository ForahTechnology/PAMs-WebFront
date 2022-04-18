import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabSamplesComponent } from './lab-samples.component';

describe('LabSamplesComponent', () => {
  let component: LabSamplesComponent;
  let fixture: ComponentFixture<LabSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
