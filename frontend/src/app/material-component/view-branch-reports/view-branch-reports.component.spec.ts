import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBranchReportsComponent } from './view-branch-reports.component';

describe('ViewBranchReportsComponent', () => {
  let component: ViewBranchReportsComponent;
  let fixture: ComponentFixture<ViewBranchReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBranchReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBranchReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
