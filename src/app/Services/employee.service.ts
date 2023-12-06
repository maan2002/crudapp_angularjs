import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  // Post call 
  postEmployee(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map((res)=>{
      return res;
    }))
  }

  // get call 
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res)=>{
      return res;
    }))
  }

  // update call 
  updateEmployee(id:string,data:any){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res)=>{
      return res;
    }))
  }

  // delete call 
  deleteEmployee(id:string){
    return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res)=>{
      return res;
    }))
  }

}
