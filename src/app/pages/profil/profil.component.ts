import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  // @ts-ignore
  userData = JSON.parse(localStorage.getItem('user'))
  loading: boolean = false;

  constructor(private fb: FormBuilder) { }

  profileForm = this.fb.group({
    email: [this.userData.email, [Validators.required, Validators.email]],
    firstName: [this.userData.firstName, Validators.required],
    phone: [this.userData.phoneNumber, Validators.required],
    lastName: [this.userData.lastName, Validators.required],
  });
  ngOnInit(): void {
  }

}
