import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-view-branch-reports',
  templateUrl: './view-branch-reports.component.html',
  styleUrls: ['./view-branch-reports.component.scss']
})
export class ViewBranchReportsComponent implements OnInit{
  startDate: any;
  endDate: any;
  records: any = [];
  error: any;
  branch: any;

  constructor(private http: HttpClient,
    private billService:BillService) {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['name', 'uuid','contactNumber','doctorDetails','email','paymentMethod','createdAt','createdBy'];

  getRecords() {
    this.billService.generateBranchReports(this.startDate,this.endDate).subscribe((data: any) => {
        this.records = data;
      },
      (error) => {
        this.error = error.message;
      });
  }
}
