import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BranchService } from '../services/branch.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-branchlogin',
  templateUrl: './branchlogin.component.html',
  styleUrls: ['./branchlogin.component.scss']
})
export class BranchloginComponent {
  loginForm:any = FormGroup;
  responseMessage : any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private branchService:BranchService,
    public dialogRef:MatDialogRef<BranchloginComponent>,
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
    this.branchService.login(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      //console.log(response);
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
