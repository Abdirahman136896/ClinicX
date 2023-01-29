import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DoctorService } from '../services/doctor.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-doctorlogin',
  templateUrl: './doctorlogin.component.html',
  styleUrls: ['./doctorlogin.component.scss']
})
export class DoctorloginComponent implements OnInit{
  loginForm:any = FormGroup;
  responseMessage : any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private doctorService:DoctorService,
    public dialogRef:MatDialogRef<DoctorloginComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null,Validators.required]
    });
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.doctorService.login(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      //console.log(response.token);
      localStorage.setItem("token",response.token);
      this.router.navigate(['/clinicx/dashboard']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
