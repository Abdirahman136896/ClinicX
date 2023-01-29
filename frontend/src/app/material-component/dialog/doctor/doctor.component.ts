import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BranchService } from 'src/app/services/branch.service';
import { CategoryService } from 'src/app/services/category.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent  implements OnInit {
  onAddDoctor = new EventEmitter();
  onEditDoctor = new EventEmitter();
  doctorForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;
  categorys:any = [];
  products:any = [];
  branches:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private doctorService:DoctorService,
  public dialogRef:MatDialogRef<DoctorComponent>,
  private branchService:BranchService,
  private productService:ProductService,
  private categoryService:CategoryService,
  private snackbarService:SnackbarService){}

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      description:[null,Validators.required],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,Validators.required],
      branchId:[null,Validators.required],
      categoryId:[null,Validators.required],
      productId:[null,Validators.required]
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.doctorForm.patchValue(this.dialogData.data);
    }

    this.getBranches();
    this.getCategorys();
    this.getProducts();
  }

  getBranches(){
    this.branchService.getBranches().subscribe((response:any)=>{
      this.branches = response;
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getCategorys(){
    this.categoryService.getCategorys().subscribe((response:any)=>{
      this.categorys = response;
      //console.log(response);
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getProductsByCategory(value:any){
    //console.log(value);
    this.productService.getProductsByCategory(value).subscribe((response:any)=>{
      this.products = response;
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe((response:any)=>{
      this.products = response;
      //console.log(response.map((item:any) => item.categoryId));
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  handleSubmit(){
    if(this.dialogAction === 'Edit'){
      this.edit();
    }else{
      this.add();
    }
  }

  add() {
    var formData = this.doctorForm.value;
    var data = {
      name:formData.name,
      description:formData.description,
      contactNumber:formData.contactNumber,
      email:formData.email,
      password:formData.password,
      branchId:formData.branchId,
      categoryId:formData.categoryId,
      productId:formData.productId
    }
    this.doctorService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddDoctor.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success")
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  edit() {
    var formData = this.doctorForm.value;
    var data = {
      id: this.dialogData.data.id,
      name:formData.name,
      description:formData.description,
      contactNumber:formData.contactNumber,
      email:formData.email,
      password:formData.password,
      branchId:formData.branchId,
      categoryId:formData.categoryId,
      productId:formData.productId
    }
    this.doctorService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditDoctor.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success")
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
