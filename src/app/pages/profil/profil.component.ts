import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../services/auth/auth-service.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  // @ts-ignore
  userData = JSON.parse(localStorage.getItem('user'))
  loading: boolean = false;

  constructor(private fb: UntypedFormBuilder,public user:AuthServiceService) { }

  profileForm = this.fb.group({
    firstName: [this.userData.firstName, Validators.required],
    phoneNumber: [this.userData.phoneNumber, Validators.required],
    lastName: [this.userData.lastName, Validators.required],
    email: [this.userData.email],
  });
  ngOnInit(): void {
  }
  onSubmit():void{
    this.user.updateUser(this.profileForm.value).subscribe((res)=>{
      console.log('success')
    })
  }

}
