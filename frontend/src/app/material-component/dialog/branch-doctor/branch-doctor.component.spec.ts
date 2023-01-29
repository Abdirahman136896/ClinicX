import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDoctorComponent } from './branch-doctor.component';

describe('BranchDoctorComponent', () => {
  let component: BranchDoctorComponent;
  let fixture: ComponentFixture<BranchDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
