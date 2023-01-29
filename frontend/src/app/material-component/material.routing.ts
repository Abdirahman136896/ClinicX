import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageBranchComponent } from './manage-branch/manage-branch.component';
import { ManageDoctorComponent } from './manage-doctor/manage-doctor.component';
import { ViewBookingReportsComponent } from './view-booking-reports/view-booking-reports.component';
import { ManageBranchDoctorsComponent } from './manage-branch-doctors/manage-branch-doctors.component';
import { ViewBillByBranchComponent } from './view-bill-by-branch/view-bill-by-branch.component';
import { ViewBranchReportsComponent } from './view-branch-reports/view-branch-reports.component';
import { ViewBillByDoctorComponent } from './view-bill-by-doctor/view-bill-by-doctor.component';
import { ViewDoctorReportComponent } from './view-doctor-report/view-doctor-report.component';

export const MaterialRoutes: Routes = [
    {
        path: 'category',
        component:ManageCategoryComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path: 'product',
        component:ManageProductComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path: 'order',
        component:ManageOrderComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin','user','branch','doctoruser']
        }
    },
    {
        path: 'bill',
        component:ViewBillComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path: 'billbybranch',
        component:ViewBillByBranchComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['branch']
        }
    },
    {
        path: 'billbydoctor',
        component:ViewBillByDoctorComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['doctoruser']
        }
    },
    {
        path: 'user',
        component:ManageUserComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path: 'branch',
        component:ManageBranchComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path: 'doctor',
        component:ManageDoctorComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path: 'branchdoctors',
        component:ManageBranchDoctorsComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['branch']
        }
    },
    {
        path: 'view-booking-reports',
        component:ViewBookingReportsComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin','branch']
        }
    },
    {
        path: 'view-doctor-reports',
        component:ViewDoctorReportComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['doctoruser']
        }
    },
    {
        path: 'view-branch-reports',
        component:ViewBranchReportsComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['branch']
        }
    }
];
