import { Injectable } from "@angular/core";

export interface Menu{
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    {state: 'dashboard',name:'Dashboard',icon:'dashboard',role:''},
    {state: 'category',name:'Manage Category',icon:'category',role:'admin'},
    {state: 'product',name:'Manage Services',icon:'medical_services',role:'admin'},
    {state: 'order',name:'Manage Bookings',icon:'book_online',role:''},
    {state: 'bill',name:'View Bills',icon:'import_contacts',role:'admin'},
    {state: 'billbybranch',name:'View Branch Bills',icon:'import_contacts',role:'branch'},
    {state: 'billbydoctor',name:'View Doctor Bills',icon:'import_contacts',role:'doctoruser'},
    {state: 'user',name:'Manage Users',icon:'people',role:'admin'},
    {state: 'branch',name:'Manage Branches',icon:'local_hospital',role:'admin'},
    {state: 'doctor',name:'Manage Doctor',icon:'lda',role:'admin'},
    {state: 'branchdoctors',name:'Manage Branch Doctors',icon:'lda',role:'branch'},
    {state: 'view-booking-reports',name:'Generate Reports',icon:'receipt_long',role:'admin'},
    {state: 'view-branch-reports',name:'Branch Reports',icon:'receipt_long',role:'branch'},
    {state: 'view-doctor-reports',name:'Doctor Reports',icon:'receipt_long',role:'doctoruser'}
];

@Injectable()
export class MenuItems{
    getMenuitem(): Menu[]{
        return MENUITEMS;
    }
}
