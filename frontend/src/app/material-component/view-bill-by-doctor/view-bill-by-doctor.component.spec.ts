import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillByDoctorComponent } from './view-bill-by-doctor.component';

describe('ViewBillByDoctorComponent', () => {
  let component: ViewBillByDoctorComponent;
  let fixture: ComponentFixture<ViewBillByDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBillByDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBillByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
