import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingReportsComponent } from './view-booking-reports.component';

describe('ViewBookingReportsComponent', () => {
  let component: ViewBookingReportsComponent;
  let fixture: ComponentFixture<ViewBookingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBookingReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
