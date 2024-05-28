import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {TasksService} from "../../services/tasks/tasks.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  // @ts-ignore
  userData = JSON.parse(localStorage.getItem('user'))
  selectedTask: any = null;
  isModalVisible = false;
  isContactVisible = false;
  progressSteps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
 value= 0

  tasks:any = [];


  todo:any = [];

  current:any = [];

  completed:any = [];
  taskForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    timeInHours: ['', Validators.required],
  });
  contact = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    ticket: ['', Validators.required],
  });
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const id = event.container.data[event.currentIndex]['id']
      const progress = event.container.data[event.currentIndex].progress
      if (event.container.id === 'cdk-drop-list-0'){
        this.onUpdateTaskStatus(id,progress,'TODO')
      }
      if (event.container.id === 'cdk-drop-list-1'){
        this.onUpdateTaskStatus(id,progress,'CURRENT')

      }
      if (event.container.id === 'cdk-drop-list-2'){
        this.onUpdateTaskStatus(id,progress,'COMPLETED')
      }
    }
  }
  openEditModal(task: any): void {
    this.selectedTask = { ...task }; // Create a copy of the task to edit
    this.taskForm.patchValue(this.selectedTask);
    console.log(this.selectedTask)// Populate the form with the task data
    this.isModalVisible = true;
  }
  addTask(): void {
    this.selectedTask = null;
    this.taskForm.reset();
    this.isModalVisible = true;
  }
  addContact(): void {
    this.contact.reset();
    this.isContactVisible = true;
  }

  handleOk(): void {
    if (this.taskForm.valid) {
      if (this.selectedTask) {
        // Editing existing task
        this.onUpdateTask();
      } else {
        // Adding new task
       this.onAddTAsk()
      }
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
  handleOkContact(): void {
    if (this.contact.valid) {
      this.onContactAdmin();
      this.isContactVisible = false;
    }
  }

  handleCancelContact(): void {
    this.isContactVisible = false;
  }

  confirmDelete(task: any): void {
    this.modal.error({
      nzTitle: 'Are you sure you want to delete this task?',
      nzContent: `<b>${task.name}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDeleteTAsk(task.id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
constructor(
  private fb: FormBuilder,
  private modal: NzModalService,
  public taskService:TasksService
) {
}

onGetTask():void{
    this.taskService.getTasks().subscribe((res:any)=>{
      this.tasks = res.data
    })
}
  onProgressChange(task: any, progress: number) {
    task.progress = progress;
    this.taskService.updateProgress(task.id, progress, this.userData.id).subscribe((res:any)=>{
      this.onGetTask()
    })
  }
  onAddTAsk():void{
    let newData = {...this.taskForm.value, progress: 0,status: "TODO"}
    this.taskService.addTasks(newData).subscribe((res:any)=>{
      this.onGetTask();
      this.onGetCurrentFiltered('TODO')
      this.onGetCurrentFiltered('CURRENT')
      this.onGetCurrentFiltered('COMPLETED')
      this.isModalVisible = false;

    })
  }
  onDeleteTAsk(id:any):void{
    this.taskService.deleteTasks(id).subscribe((res:any)=>{
      this.onGetTask();
      this.onGetCurrentFiltered('TODO')
      this.onGetCurrentFiltered('CURRENT')
      this.onGetCurrentFiltered('COMPLETED')
    })
  }
 onUpdateTask(){
   let newData =
     {
       ...this.taskForm.value,
     progress: this.selectedTask.progress,
       status: this.selectedTask.status
     }
   this.taskService.updateTask(this.selectedTask.id, newData).subscribe((res:any)=>{
      console.log(res)
      this.onGetTask()
     this.onGetCurrentFiltered('TODO')
     this.onGetCurrentFiltered('CURRENT')
     this.onGetCurrentFiltered('COMPLETED')
      this.isModalVisible = false;

    })
 }
 onGetCurrentFiltered(status :string):void{
    this.taskService.getFilteredTask(status).subscribe((res)=>{
      if (status === 'TODO'){
        this.todo = res.data
        console.log('TODOD',res.data)
      }
      if (status === 'CURRENT'){
        this.current = res.data
        console.log('CURRENT',res.data)
      }
      if (status === 'COMPLETED'){
        this.completed = res.data
        console.log('COMPLETED',res.data)

      }
    })

 }
 onUpdateTaskStatus(id:any,progress:any,status:any):void{
    this.taskService.updateStatus(id,progress,this.userData?.id,status).subscribe((res)=>{
      this.onGetCurrentFiltered('TODO')
      this.onGetCurrentFiltered('CURRENT')
      this.onGetCurrentFiltered('COMPLETED')
      this.onGetTask();
    })
 }
onContactAdmin():void{
    let name = this.contact.value.title
    let description = this.contact.value.description
    let ticket = this.contact.value.ticket
    this.taskService.contactAdmin(name,description,ticket).subscribe((res:any)=>{
      console.log(res)
    })
}

  ngOnInit(): void {
    console.log(this.userData?.id)
   this.onGetTask()
    this.onGetCurrentFiltered('TODO')
    this.onGetCurrentFiltered('CURRENT')
    this.onGetCurrentFiltered('COMPLETED')
  }
}

