import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  signup(data:any){
    return this.httpClient.post(this.url+"/branch/signup",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url+
      "/branch/forgotpassword",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      })
  }

  login(data:any){
    return this.httpClient.post(this.url+"/branch/login",data,{
      headers:  new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  checkToken(){
    return this.httpClient.get(this.url + "/branch/checkToken");
  }

  changePassword(data:any){
    return this.httpClient.post(this.url + "/branch/changePassword",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getBranches(){
    return this.httpClient.get(this.url+"/branch/get/");
  }

  update(data:any){
    return this.httpClient.patch(this.url+"/branch/update",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }
}
