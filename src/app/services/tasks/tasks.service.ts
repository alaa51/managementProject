import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../config/constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(public  http:HttpClient) { }
  getTasks():Observable<any>{
    return this.http.get(BASE_URL+ 'task/all')
  }
  addTasks(data:any):Observable<any>{
    return this.http.post(BASE_URL+ 'task/admin', data)
  }
  deleteTasks(id:any):Observable<any>{
    return this.http.delete(BASE_URL+ 'task/admin/'+ id)
  }
  assignTaskTo(id:any, technicalId:any):Observable<any>{
    return this.http.put(BASE_URL+ 'task/admin/'+id+'?assignedToId='+technicalId,{})
  }
  updateProgress(id:any,progress:any, technicalId:any):Observable<any>{
    return this.http.put(BASE_URL+ 'task/technician/'+id+'?progress='+progress+'&assignedToId='+technicalId,{})
  }
  updateTask(id:any, data:any):Observable<any>{
    return this.http.put(BASE_URL+ 'task/admin/'+id, data)
  }
  getFilteredTask(status:string):Observable<any>{
    return  this.http.get(BASE_URL+ 'task/all/search?taskStatus='+ status)
  }
  updateStatus(id:any,progress:any, technicalId:any,status:any):Observable<any>{
    return this.http.put(BASE_URL+ 'task/technician/'+id+'?progress='+progress+'&status='+status+'&assignedToId='+technicalId,{})
  }
  contactAdmin(name:any, description:any, task: any):Observable<any>{
    return  this.http.get(BASE_URL+'task/technician/send?title='+name+'&description='+description+'&task='+task)
  }
  assignTo(id: any, technicianID:any, data:any):Observable<any>{
    return  this.http.put(BASE_URL+ 'task/admin/'+id+'?assignedToId='+ technicianID,data)
  }
}
