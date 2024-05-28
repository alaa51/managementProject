import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {AnalysisService} from "../../services/analysis/analysis.service";
import {TasksService} from "../../services/tasks/tasks.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public chart: any;
  public chart2: any;
  numberOfClients = 0;
  numberOfTasks = 0;
  completedTasks = 0;
  chart1Labels :any= [];
  chart2Labels :any= [];
  chart2Values :any= [];
  chart1Values :any= [];

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.chart1Labels,
        datasets: [
          {
            label: "Tasks",
            data: this.chart1Values,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  createChart2(){

    this.chart2 = new Chart("MyChart2", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.chart2Labels,
        datasets: [
          {
            label: "Client",
            data: this.chart2Values,
            backgroundColor: 'green'
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  constructor(
    public analysisService: AnalysisService,
    public taskService: TasksService
  ) { }
  onGetClientPerMouth():void{
    this.analysisService.getClientPerMonth().subscribe((res)=>{
      for (const key in res.data) {
        if (res.data.hasOwnProperty(key)) {
          this.chart2Labels.push(key);
          this.chart2Values.push(res.data[key]);
        }
      }
      this.numberOfClients = this.chart2Values.reduce((acc: any, value: any) => acc + value, 0);

      this.createChart2()
    })

  }
  onGetTask():void{
    this.taskService.getFilteredTask('COMPLETED').subscribe((res:any)=>{
      this.completedTasks = res.data.length
    })
    this.taskService.getTasks().subscribe((res:any)=>{
      this.numberOfTasks = res.data.length
    })
  }
  onGetTasksInMonth():void{
    this.analysisService.getTasksInMonth().subscribe((res)=>{
      for (const key in res.data) {
        if (res.data.hasOwnProperty(key)) {
          this.chart1Labels.push(key);
          this.chart1Values.push(res.data[key]);
        }
      }
      this.createChart();

    })

  }

  ngOnInit(): void {
    this.onGetClientPerMouth();
    this.onGetTasksInMonth();
    this.onGetTask();

  }

}
