import { Component, OnInit } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {recruiterList} from "../../../mocks/data";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-tecknical-list',
  templateUrl: './tecknical-list.component.html',
  styleUrls: ['./tecknical-list.component.css']
})
export class TecknicalListComponent implements OnInit {
  data = recruiterList;
  formData = this.fb.group({
    name: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });
  isModalVisible = false;
  constructor(private modalService: NzModalService,private fb: FormBuilder) { }

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


}
