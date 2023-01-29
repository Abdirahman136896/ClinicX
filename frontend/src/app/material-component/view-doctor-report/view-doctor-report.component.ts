import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-view-doctor-report',
  templateUrl: './view-doctor-report.component.html',
  styleUrls: ['./view-doctor-report.component.scss']
})
export class ViewDoctorReportComponent {
  startDate: any;
  endDate: any;
  records: any = [];
  error: any;
  branch: any;

  constructor(private http: HttpClient,
    private billService:BillService) {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['name', 'contactNumber','doctorDetails','email','paymentMethod','createdAt','createdBy','appointment_date'];

  getRecords() {
    this.billService.generateDoctorReports(this.startDate,this.endDate).subscribe((data: any) => {
        this.records = data;
      },
      (error) => {
        this.error = error.message;
      });
  }
}
