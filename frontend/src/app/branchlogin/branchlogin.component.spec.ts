import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchloginComponent } from './branchlogin.component';

describe('BranchloginComponent', () => {
  let component: BranchloginComponent;
  let fixture: ComponentFixture<BranchloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
