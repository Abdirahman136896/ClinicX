import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';
import { BranchloginComponent } from '../branchlogin/branchlogin.component';
import { BranchService } from '../services/branch.service';
import { DoctorloginComponent } from '../doctorlogin/doctorlogin.component';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog,
    private router:Router,
    private userService: UserService,
    private branchService:BranchService,
    private doctorService:DoctorService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.userService.checkToken().subscribe((response:any)=>{
        this.router.navigate(['/clinicx/dashboard']);
      },(error:any)=>{
        console.log(error);
      })
      this.branchService.checkToken().subscribe((response:any)=>{
        this.router.navigate(['/clinicx/dashboard']);
      },(error:any)=>{
        console.log(error);
      })
      this.doctorService.checkToken().subscribe((response:any)=>{
        this.router.navigate(['/clinicx/dashboard']);
      },(error:any)=>{
        console.log(error);
      })
    }
  }

  signupAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent,dialogConfig);
  }

  forgotPasswordAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ForgotPasswordComponent,dialogConfig);
  }

  loginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(LoginComponent,dialogConfig);
  }

  branchLoginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(BranchloginComponent,dialogConfig);
  }

  doctorLoginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(DoctorloginComponent,dialogConfig);
  }

}
