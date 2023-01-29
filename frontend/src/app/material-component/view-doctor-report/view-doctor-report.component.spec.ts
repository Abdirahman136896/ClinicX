import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorReportComponent } from './view-doctor-report.component';

describe('ViewDoctorReportComponent', () => {
  let component: ViewDoctorReportComponent;
  let fixture: ComponentFixture<ViewDoctorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDoctorReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDoctorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
