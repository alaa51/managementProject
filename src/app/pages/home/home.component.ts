import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  selectedTask: any = null;
  isModalVisible = false;
  isContactVisible = false;
  progressSteps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
 value= 0

  tasks:any = [];
  people = ['Alice', 'Bob', 'Charlie', 'Diana'];


  todo = [
    { id: 1, title: 'Task 1', description: 'Description for task 1', time: '2 hours', created_at: '2024-05-17T10:00:00Z', assigned_to: 'Alice' },
    { id: 2, title: 'Task 2', description: 'Description for task 2', time: '3 hours', created_at: '2024-05-17T11:00:00Z', assigned_to: 'Bob' },
  ];

  current = [
    { id: 3, title: 'Task 3', description: 'Description for task 3', time: '1.5 hours', created_at: '2024-05-17T12:00:00Z', assigned_to: 'Charlie' },
  ];

  completed = [
    { id: 4, title: 'Task 4', description: 'Description for task 4', time: '4 hours', created_at: '2024-05-17T13:00:00Z', assigned_to: 'Diana' },
  ];
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    time: ['', Validators.required],
    created_at: ['', ],
    assigned_to: ['', Validators.required],
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
    }
  }
  openEditModal(task: any): void {
    this.selectedTask = { ...task }; // Create a copy of the task to edit
    this.taskForm.patchValue(this.selectedTask); // Populate the form with the task data
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
        Object.assign(this.selectedTask, this.taskForm.value);
      } else {
        // Adding new task
        const newTask = { ...this.taskForm.value, id: this.tasks.length + 1, created_at: new Date().toISOString() };
        this.tasks.push(newTask);
      }
      this.isModalVisible = false;
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
  handleOkContact(): void {
    if (this.contact.valid) {
      this.isContactVisible = false;
    }
  }

  handleCancelContact(): void {
    this.isContactVisible = false;
  }

  updateTask(updatedTask: any): void {
    const taskList = [this.todo, this.current, this.completed];
    for (const list of taskList) {
      const index = list.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        list[index] = updatedTask;
        break;
      }
    }
  }
  confirmDelete(task: any): void {
    this.modal.error({
      nzTitle: 'Are you sure you want to delete this task?',
      nzContent: `<b>${task.title}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteTask(task.id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  deleteTask(id: number): void {
    console.log('ok')
  }
constructor(private fb: FormBuilder,private modal: NzModalService) {
}

  ngOnInit(): void {
    this.tasks = [
      ...this.todo.map(task => ({ ...task, status: 'Todo' })),
      ...this.current.map(task => ({ ...task, status: 'Current' })),
      ...this.completed.map(task => ({ ...task, status: 'Completed' }))
    ];
  }
}

