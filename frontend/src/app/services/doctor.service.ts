import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+"/doctor/signup",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  /*doctorsignup(data:any){
    return this.httpClient.post(this.url+"/doctor/signup",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }*/

  forgotPassword(data:any){
    return this.httpClient.post(this.url+
      "/doctor/forgotpassword",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      })
  }

  login(data:any){
    //console.log(data);
    return this.httpClient.post(this.url+"/doctor/login",data,{
      headers:  new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  checkToken(){
    return this.httpClient.get(this.url + "/doctor/checkToken");
  }

  changePassword(data:any){
    return this.httpClient.post(this.url + "/doctor/changePassword",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/doctor/delete/"+id,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getDoctors(){
    return this.httpClient.get(this.url+"/doctor/get/");
  }

  getDoctorsByBranch(id:any){
    return this.httpClient.get(this.url+"/doctor/getDoctorsByBranch/"+id);
  }

  getDoctorsBranch(){
    return this.httpClient.get(this.url+"/doctor/getDoctorsBranch/");
  }

  getDoctorsByProduct(id:any){
    return this.httpClient.get(this.url+"/doctor/getDoctorsByProduct/"+id);
  }

  update(data:any){
    return this.httpClient.patch(this.url+"/doctor/update",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getById(id:any){
    return this.httpClient.get(this.url+"/doctor/getById/"+id);
  }
}
