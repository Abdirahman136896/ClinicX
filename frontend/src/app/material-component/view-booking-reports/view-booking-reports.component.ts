import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-view-booking-reports',
  templateUrl: './view-booking-reports.component.html',
  styleUrls: ['./view-booking-reports.component.scss']
})
export class ViewBookingReportsComponent implements OnInit{
  startDate: any;
  endDate: any;
  records: any = [];
  error: any;
  branch: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['name', 'uuid','contactNumber','doctorDetails','email','paymentMethod','createdAt','createdBy'];

  getRecords() {
    this.http
      .get(`http://localhost:8080/bill/table/${this.startDate}/${this.endDate}`)
      .subscribe((data: any) => {
        this.records = data;
      },
      (error) => {
        this.error = error.message;
      });
  }
}
