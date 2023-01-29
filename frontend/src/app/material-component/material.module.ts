import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductComponent } from './dialog/product/product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageBranchComponent } from './manage-branch/manage-branch.component';
import { BranchComponent } from './dialog/branch/branch.component';
import { ManageDoctorComponent } from './manage-doctor/manage-doctor.component';
import { ViewBookingReportsComponent } from './view-booking-reports/view-booking-reports.component';
import { DoctorComponent } from './dialog/doctor/doctor.component';
import { ManageBranchDoctorsComponent } from './manage-branch-doctors/manage-branch-doctors.component';
import { BranchDoctorComponent } from './dialog/branch-doctor/branch-doctor.component';
import { ViewBillByBranchComponent } from './view-bill-by-branch/view-bill-by-branch.component';
import { ViewBranchReportsComponent } from './view-branch-reports/view-branch-reports.component';
import { ViewBillByDoctorComponent } from './view-bill-by-doctor/view-bill-by-doctor.component';
import { ViewDoctorReportComponent } from './view-doctor-report/view-doctor-report.component';
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatDatepickerModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ManageOrderComponent,
    ViewBillComponent,
    ManageUserComponent,
    ManageBranchComponent,
    BranchComponent,
    ManageDoctorComponent,
    ViewBookingReportsComponent,
    DoctorComponent,
    ManageBranchDoctorsComponent,
    BranchDoctorComponent,
    ViewBillByBranchComponent,
    ViewBranchReportsComponent,
    ViewBillByDoctorComponent,
    ViewDoctorReportComponent    
  ]
})
export class MaterialComponentsModule {}
