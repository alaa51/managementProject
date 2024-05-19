import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  loading: boolean = false;

  constructor(private fb: FormBuilder) { }

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    phone: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  ngOnInit(): void {
  }

  submitProfile() {
    if (this.profileForm.valid) {
      this.loading = true;
      // Here you can handle form submission, e.g., send data to server
      setTimeout(() => {
        console.log(this.profileForm.value);
        this.loading = false;
      }, 2000);
    }
  }
}
