
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { saveAs } from 'file-saver';
import { DoctorService } from 'src/app/services/doctor.service';
import { BranchService } from 'src/app/services/branch.service';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  displayedColumns:string[] = ['name','category','branch','doctor','doctor_contactNumber','doctor_email','appointment_date','price','quantity','total','edit'];
  dataSource:any = [];
  manageOrderForm:any = FormGroup;
  branches:any = [];
  categorys:any = [];
  products:any = [];
  doctors:any = [];
  price:any;
  appointment_date:any;
  doctor_name:any;
  totalAmount:number = 0;
  responseMessage:any;
  startDate = new Date();

  // set the minimum selectable date for startPicker as tomorrow
  minStartDate = new Date(this.startDate.setDate(this.startDate.getDate() + 1));

  minDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // one day from now
  maxDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  constructor(private formBuilder:FormBuilder,
    private branchService:BranchService,
    private categoryService:CategoryService,
    private productService:ProductService,
    private doctorService:DoctorService,
    private snackbarService:SnackbarService,
    private billService:BillService,
    private ngxService:NgxUiLoaderService) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.getBranches();
    this.getCategorys();
    this.manageOrderForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      paymentMethod:[null,[Validators.required]],
      appointment_date:[null,[Validators.required]],
      product:[null,[Validators.required]],
      category:[null,[Validators.required]],
      branch:[null,[Validators.required]],
      doctor:[null,[Validators.required]],
      doctor_contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      doctor_email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      price:[null,[Validators.required]],
      quantity:[null,[Validators.required]],
      total:[0,[Validators.required]]
    })
  }

  getCategorys(){
    this.categoryService.getCategorys().subscribe((response:any)=>{
      this.ngxService.stop();
      this.categorys = response;
      //console.log(response);
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getProductsByCategory(value:any){
    this.productService.getProductsByCategory(value.id).subscribe((response:any)=>{
      this.products = response;
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getProductDetails(value:any){
    this.productService.getById(value.id).subscribe((response:any)=>{
      this.price = response[0].price;
      //console.log(this.price);
      this.manageOrderForm.controls['price'].setValue(response[0].price);
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.price*1);
      //console.log(value.id);
      //this.getDoctorsByProduct(value.id);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getBranches(){
    this.branchService.getBranches().subscribe((response:any)=>{
      this.ngxService.stop();
      this.branches = response;
      //console.log(response);
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getDoctorByBranch(value:any){
    this.doctorService.getDoctorsByBranch(value.id).subscribe((response:any)=>{
      this.doctors = response;
      console.log(this.doctors);
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getDoctorsByProduct(value:any){
    this.doctorService.getDoctorsByProduct(value.id).subscribe((response:any)=>{
      //console.log(this.doctors[0].branchId);
      //if(this.doctors[0].branchId == response[0].branchId){
      this.doctors = response;
      //console.log(response[0].branchId);
      /*}
      this.doctors = [];
      console.log("Not the same")*/
      /*console.log(this.doctors[0].branchId);
      console.log(response[0].branchId);*/
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  getDoctorDetails(value:any){
    this.doctorService.getById(value.id).subscribe((response:any)=>{
      this.manageOrderForm.controls['doctor_contactNumber'].setValue(response[0].contactNumber);
      this.manageOrderForm.controls['doctor_email'].setValue(response[0].email);
      //console.log("response:",response[0]);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  setQuantity(value:any){
    var temp = this.manageOrderForm.controls['quantity'].value;
    if(temp > 0){
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }else if(temp != ''){
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
  }

  validateProductAdd(){
    if(this.manageOrderForm.controls['total'].value === 0 || this.manageOrderForm.controls['total'].value === null || this.manageOrderForm.controls['quantity'].value <= 0){
      return true;
    }else{
      return false;
    }
  }

  validateSubmit(){
    if(this.totalAmount === 0 || this.manageOrderForm.controls['name'].value === null || this.manageOrderForm.controls['email'].value === null || this.manageOrderForm.controls['contactNumber'].value === null || this.manageOrderForm.controls['paymentMethod'].value === null || !(this.manageOrderForm.controls['contactNumber'].valid) || this.manageOrderForm.controls['appointment_date'].value === null || !(this.manageOrderForm.controls['email'].valid)){
      return true;
    }else{
      return false;
    }
  }

  add(){
    var formData = this.manageOrderForm.value;
    //console.log(formData.product.id);
    var productName = this.dataSource.find((e:{id:number;})=>e.id == formData.product.id);
    //console.log(productName);
    if(productName === undefined) {
      this.totalAmount = this.totalAmount + formData.total;
      //console.log(this.totalAmount);
      this.dataSource.push({id:formData.product.id,name:formData.product.name,category:formData.category.name,branch:formData.branch.name,doctor:formData.doctor.name,doctor_contactNumber:formData.doctor_contactNumber,doctor_email:formData.doctor_email,quantity:formData.quantity,price:formData.price,appointment_date:formData.appointment_date,total:formData.total});
      console.log(this.dataSource);
      this.dataSource = [...this.dataSource];
      console.log(this.dataSource);
      this.snackbarService.openSnackBar(GlobalConstants.productAdded,"success");
    }
    else{
      console.log(GlobalConstants.error);
      this.snackbarService.openSnackBar(GlobalConstants.productExistError,GlobalConstants.error);
    }
  }

  handleDeleteAction(value:any,element:any){
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value,1);
    this.dataSource = [...this.dataSource];
  }

  submitAction(){
    this.ngxService.start();
    var formData = this.manageOrderForm.value;
    var data = {
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      paymentMethod:formData.paymentMethod,
      totalAmount:this.totalAmount,
      productDetails:JSON.stringify(this.dataSource),
      doctorDetails:JSON.stringify(this.dataSource),
      branch:formData.branch
    }
    this.billService.generateReport(data).subscribe((response:any)=>{
      this.downloadFile(response?.uuid);
      this.manageOrderForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  downloadFile(fileName:any){
    var data = {
      uuid:fileName
    }
    this.billService.getPDF(data).subscribe((response:any)=>{
      saveAs(response,fileName+'.pdf');
      this.ngxService.stop();
    })
  }
}
