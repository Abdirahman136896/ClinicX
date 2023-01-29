import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBranchDoctorsComponent } from './manage-branch-doctors.component';

describe('ManageBranchDoctorsComponent', () => {
  let component: ManageBranchDoctorsComponent;
  let fixture: ComponentFixture<ManageBranchDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBranchDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBranchDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
