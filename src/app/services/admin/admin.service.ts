import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../../config/constants";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http:HttpClient) { }
  getTechnical():Observable<any>{
    return  this.http.get(BASE_URL+'users/all/technicians')
  }
  getClient():Observable<any>{
    return  this.http.get(BASE_URL+'users/all/clients')
  }
}
