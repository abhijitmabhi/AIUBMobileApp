import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClassScheduleService } from 'src/app/services/employee/class-schedule.service';
import { LoadingService } from 'src/app/core/loader/loading.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-class-schedule',
  templateUrl: './employee-class-schedule.page.html',
  styleUrls: ['./employee-class-schedule.page.scss'],
})
export class EmployeeClassSchedulePage implements OnInit {

  classSchedules: any;

  constructor(
    private datePipe: DatePipe,
    private classSceduleService: ClassScheduleService,
    private loadingService: LoadingService,
    private platform: Platform,
    private router: Router
  ) {
    this.platform.backButton.subscribe(()=>{
      this.router.navigate(['/employee-tab/tabs/employeeHome']);
    });
   }

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
    this.loadingService.loadingStart();
    this.classSceduleService.getTeacherClassSchedule(fromDateTime, toDateTime).subscribe(response => {
      this.loadingService.loadingDismiss();
      let result = response;
      if(result.HasError){
        console.log(result.Messages);
      }else{
        this.classSchedules = result.Data;
      }
    },
      error => {
        this.loadingService.loadingDismiss();
        let errorResponse = error;
        console.log(errorResponse.error.Message);
    });
  }

}
