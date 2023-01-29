import { Component, Inject, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BranchService } from 'src/app/services/branch.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit{
  onAddBranch = new EventEmitter();
  onEditBranch = new EventEmitter();
  branchForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add"
  responseMessage:any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private branchService:BranchService,
  public dialogRef:MatDialogRef<BranchComponent>,
  private snackbarService:SnackbarService){}

  ngOnInit(): void {
    this.branchForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      location:[null,[Validators.required]],
      contactNumber:[null,[Validators.required]],
      email:[null,[Validators.required]],
      password:[null,[Validators.required]],
      role:[null,[Validators.required]]
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "update";
      this.branchForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Edit "){
      this.edit()
    }else{
      this.add();
    }
  }

  add(){
    var formData = this.branchForm.value;
    var data = {
      name: formData.name,
      location:formData.location,
      contactNumber:formData.contactNumber,
      email:formData.email,
      password:formData.password,
      role:formData.role
    }
    this.branchService.signup(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddBranch.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  edit(){
    var formData = this.branchForm.value;
    var data = {
      id:this.dialogData.data.id,
      name: formData.name,
      location:formData.location,
      contactNumber:formData.contactNumber,
      email:formData.email,
      password:formData.password,
      role:formData.role
    }
    this.branchService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditBranch.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
