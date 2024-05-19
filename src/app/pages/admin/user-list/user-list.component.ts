import { Component, OnInit } from '@angular/core';
import {recruiterList} from "../../../mocks/data";
import {FormBuilder, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  data = recruiterList;
  formData = this.fb.group({
    name: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });
  isModalVisible = false;
  constructor(private modalService: NzModalService,private fb: FormBuilder,public router:Router) { }

  ngOnInit(): void {
  }
  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'ARe you sure you want to deactivate this offer??.',
      nzOkText: 'Deactivate',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOkDanger: true
    });
  }
  addData() {
    const newData = {
      id: this.data.length + 1,
      name: this.formData.value.name,
      lastName: this.formData.value.lastName,
      phoneNumber: this.formData.value.phoneNumber,
      email: this.formData.value.email
    };
    console.log('dsfdsfdsf', newData)
    this.data.push(newData);

    // Clear the form after adding data
    this.formData.reset();

    // Close the modal after adding data
    this.isModalVisible = false;
  }

  // Method to open the modal
  openModal() {
    this.isModalVisible = true;
  }
  handleCancel() {
    this.isModalVisible = false;
  }
  handleNavigate(id:any):void{
    this.router.navigate(
      ['/dashboard/user-details'],
      { queryParams: { id: id} }
    );

  }

}
