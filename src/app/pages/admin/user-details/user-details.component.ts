import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {materiel, recruiterList} from "../../../mocks/data";
import {FormBuilder, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  data = materiel;
  isEditing = false;
  currentEditId: number | null = null;
  client = {
    id: 1,
    name: 'Liam',
    lastName: 'Nguyen',
    phoneNumber: '432-156-9870',
    email: 'liam.nguyen@example.com'
  };


  formData = this.fb.group({
    title : [null, [Validators.required]],
    description: [null, [Validators.required]],
  });
  isModalVisible = false;
  constructor(private route: ActivatedRoute,private modalService: NzModalService,private fb: FormBuilder) {}

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'ARe you sure you want to Delete this materiel??.',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOkDanger: true
    });
  }
  addData() {
    const newData = {
      id: this.data.length + 1,
      title: this.formData.value.title,
      description: this.formData.value.description,
    };
    this.data.push(newData);

    // Clear the form after adding data
    this.formData.reset();

    // Close the modal after adding data
    this.isModalVisible = false;
  }
  openEditModal(item: any): void {
    this.isEditing = true;
    this.currentEditId = item.id;
    this.formData.setValue({
      title: item.title,
      description: item.description
    });
    this.isModalVisible = true;
  }

  // Method to open the modal
  openModal() {
    this.isEditing = false;
    this.currentEditId = null;
    this.formData.reset();
    this.isModalVisible = true;
  }
  handleCancel() {
    this.isModalVisible = false;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      console.log('User ID:', this.userId);
    });
  }

}
