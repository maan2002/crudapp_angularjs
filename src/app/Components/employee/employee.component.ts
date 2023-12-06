import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EmployeeService} from 'src/app/Services/employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  form!:FormGroup;
  employeeData:any;
  employeeEditId!:string;
  updateBtn:string="Add";
  constructor(private formbuilder:FormBuilder, private api:EmployeeService){

  }
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      address: [""],
      salary: [""]
    })
    this.getEmployeeDetail();
    
  }

  any(){
    if(this.employeeEditId){
      this.api.updateEmployee(this.employeeEditId,this.form.value).subscribe({
        next: (res)=>{
          alert("Employee Edit Successfully");
          this.getEmployeeDetail();
          let forCancel = document.getElementById('cancel');
          forCancel?.click();
          this.form.reset();

        },
        error: (err)=>{
          alert("Error in Edit Employee");
        }
      })
    }
    else{

      this.api.postEmployee(this.form.value).subscribe({
        next: (res)=>{
          alert("Employee Created Successfully");
          this.getEmployeeDetail();
          let forCancel = document.getElementById('cancel');
          forCancel?.click();
          this.form.reset();

        },
        error: (err)=>{
          alert("Error in Employee Creation");
        }
      })
    }
  }

  postEmployeeDetail(){
    
  }

  getEmployeeDetail(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;
    })
  }

  onEdit(id:string,record:any){
    this.updateBtn = "Update";
    this.employeeEditId= id;
    this.form.controls["firstName"].setValue(record.firstName);
    this.form.controls["lastName"].setValue(record.lastName);
    this.form.controls["email"].setValue(record.email);
    this.form.controls["address"].setValue(record.address);
    this.form.controls["salary"].setValue(record.salary);
  }

  deleteEmployeeDetail(id:string){
    this.api.deleteEmployee(id).subscribe(res=>{
      alert("Employee Deleted Successfully");
      this.getEmployeeDetail();
    })
  }
}
