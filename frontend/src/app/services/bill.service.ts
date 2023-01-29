import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  generateReport(data:any){
    return this.httpClient.post(this.url+"/bill/generateReport/",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getPDF(data:any):Observable<Blob>{
    return this.httpClient.post(this.url+"/bill/getPdf/",data,{responseType:'blob'});
  }

  getBills(){
    return this.httpClient.get(this.url+"/bill/getBills/");
  }

  getBillsByBranch(){
    return this.httpClient.get(this.url+"/bill/getBillsByBranch/");
  }

  getBillsByDoctor(){
    return this.httpClient.get(this.url+"/bill/getBillsByDoctor/");
  }

  generateBranchReports(startDate:any,endDate:any){
    return this.httpClient.get(this.url+`/bill/branch/${startDate}/${endDate}`);
  }

  generateDoctorReports(startDate:any,endDate:any){
    return this.httpClient.get(this.url+`/bill/doctor/${startDate}/${endDate}`);
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/bill/delete/"+id,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    });
  }
}
