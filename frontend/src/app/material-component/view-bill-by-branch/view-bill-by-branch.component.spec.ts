import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillByBranchComponent } from './view-bill-by-branch.component';

describe('ViewBillByBranchComponent', () => {
  let component: ViewBillByBranchComponent;
  let fixture: ComponentFixture<ViewBillByBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBillByBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBillByBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
