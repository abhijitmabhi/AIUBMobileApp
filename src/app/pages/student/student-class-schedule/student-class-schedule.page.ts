import { StudentClassScheduleService } from './../../../services/student/student-class-schedule.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoadingService } from '../../../core/loader/loading.service';

@Component({
  selector: 'app-student-class-schedule',
  templateUrl: './student-class-schedule.page.html',
  styleUrls: ['./student-class-schedule.page.scss'],
})
export class StudentClassSchedulePage implements OnInit {

  classSchedules: any;

  constructor(
    private datePipe: DatePipe,
    private studentClassSceduleService: StudentClassScheduleService,
    private loadingService: LoadingService
  ) { }

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
    this.studentClassSceduleService.getStudentClassSchedule(fromDateTime, toDateTime).subscribe(response => {
      let result = response;
      if(result.HasError){
        //Handle error
      }else{
        this.classSchedules = result.Data;
      }
    },
      error => {
        let errorResponse = error;
        console.log(errorResponse.error.Message);
    });
  }


}
