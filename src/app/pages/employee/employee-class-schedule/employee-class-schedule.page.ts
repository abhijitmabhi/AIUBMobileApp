import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClassScheduleService } from '../../../services/employee/class-schedule.service';
import { LoadingService } from '../../../core/loader/loading.service';

@Component({
  selector: 'app-employee-class-schedule',
  templateUrl: './employee-class-schedule.page.html',
  styleUrls: ['./employee-class-schedule.page.scss'],
})
export class EmployeeClassSchedulePage implements OnInit {

  classSchedules: any[] = [];

  constructor(
    private datePipe: DatePipe,
    private classSceduleService: ClassScheduleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.getClassSchedule();
  }

  doRefresh(event){
    this.getClassSchedule();
    event.target.complete();
  }

  getClassSchedule() {
    let currentDateTime = new Date();
    let fromDateTime = this.datePipe.transform(currentDateTime,'yyyy-MM-dd HH:mm:ss.SSS');
    let toDateTime = this.datePipe.transform(currentDateTime.setDate(currentDateTime.getDate()+5),'yyyy-MM-dd HH:mm:ss.SSS');
    this.classSceduleService.getTeacherClassSchedule(fromDateTime, toDateTime).subscribe(response => {
      let result = response;
      if(result.HasError){
      }else{
        this.classSchedules = result.Data;
      }
    },
      error => {
        let errorResponse = error;
        // console.log(errorResponse.error.Message);
    });
  }

}
