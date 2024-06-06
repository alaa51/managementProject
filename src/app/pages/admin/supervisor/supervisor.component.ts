import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {AdminService} from "../../../services/admin/admin.service";
import {AuthServiceService} from "../../../services/auth/auth-service.service";

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {

  data:any = [];
  formData = this.fb.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });
  isModalVisible = false;
  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    public adminService:AdminService,
    public  authService: AuthServiceService
  ) { }

  onGetTechnical():void{
    this.adminService.getAllUsers().subscribe((res:any)=>{
      this.data = res.data.filter((item: any)=>item?.role?.name === 'SUPERVISOR')
    })
  }
  ngOnInit(): void {
    this.onGetTechnical()
  }
  showConfirm(id:string): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'ARe you sure you want to block this Technical??.',
      nzOkText: 'Block',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: ()=>this.onDisableUser(id)

    });
  }
  showConfirmEnable(id:string): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'ARe you sure you want to re-activate this Technical??.',
      nzOkText: 'Activate',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOnOk: ()=>this.onEnableUser(id)
    });
  }

  addData() {
    this.authService.RegisterSupervisor(this.formData.value).subscribe((res:any)=>{
      console.log(res);
      this.onGetTechnical();
      this.isModalVisible = false;
    })

  }

  // Method to open the modal
  openModal() {
    this.isModalVisible = true;
  }
  handleCancel() {
    this.isModalVisible = false;
  }
  onEnableUser(id:string):void{
    this.authService.enableUSer(id).subscribe((res:any)=>{
      this.onGetTechnical();
    })
  }
  onDisableUser(id:string):void{
    this.authService.disableUser(id).subscribe((res:any)=>{
      this.onGetTechnical();
    })
  }

}
