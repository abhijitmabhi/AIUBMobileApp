import { LoginService } from 'src/app/services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationService } from 'src/app/core/oneSignal/push-notification.service';
import { DatePipe } from '@angular/common';
import { LoadingService } from 'src/app/core/loader/loading.service';
import { CommonService } from 'src/app/services/common/common.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { EmployeeProfileService } from 'src/app/services/employee/employee-profile.service';
import { EmployeeHomeService } from 'src/app/services/employee/employee-home.service';
import { ClassScheduleService } from 'src/app/services/employee/class-schedule.service';
import { ModalController } from '@ionic/angular';
import { NotificationDetails } from 'src/app/core/components/pop-up/notification-details/notification-details';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.page.html',
  styleUrls: ['./employee-home.page.scss'],
})
export class EmployeeHomePage implements OnInit {
  public schedule: any;
  userInfo: any;
  userImage: string = null;
  appUserInfo: any;
  notificationCount: number;
  announcements: any;
  classSchedules: any;

  //ProgressBar
  color = 'warn';
  mode = 'indeterminate';
  value = 50;

  constructor(
    private router: Router,
    private profileService: EmployeeProfileService,
    private loginService: LoginService,
    private pushNotification: PushNotificationService,
    private datePipe: DatePipe,
    private loadingService: LoadingService,
    private employeeHomeService: EmployeeHomeService,
    private classSceduleService: ClassScheduleService,
    private commonService: CommonService,
    private alertService: AlertService,
    private modalController:ModalController
  ) { }

  ngOnInit() {
    this.pushNotification.getPlayerID();
    this.getUserWarningList();
    this.getClassSchedule();
    this.getCurrentUserInfo();
    this.getUserProfileImage();
  }

  private currentDateTime = new Date();
  // private fromDateTime = this.datePipe.transform(this.currentDateTime, 'yyyy-MM-dd HH:mm:ss.SSS');
  // private tillDateTime = this.datePipe.transform(this.currentDateTime.setDate(this.currentDateTime.getDate() + 5), 'yyyy-MM-dd HH:mm:ss.SSS');

  getClassSchedule() {
    let fromDateTime = this.datePipe.transform(this.currentDateTime,'yyyy-MM-dd HH:mm:ss.SSS');
    let toDateTime = this.datePipe.transform(this.currentDateTime.setDate(this.currentDateTime.getDate()+1),'yyyy-MM-dd HH:mm:ss.SSS');

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

  getCurrentUserInfo() {
    this.loginService.currentUserInfo().subscribe(res => {
      let result = res;
      if(result.HasError){
        console.log(result.Messages);
      }else{
        this.appUserInfo = result.Data;
        this.notificationCount = this.appUserInfo.UnReadNotificationCount;
      }
    })
  }

  getUserProfileImage() {
    this.profileService.getImage().subscribe(response => {
      this.userImage = response;
    })
  }

  ShowProfile(){
    this.router.navigate(['/employee-profile']);
  }

  ShowClassSchedule(){
    this.router.navigate(['/employee-class-schedule']);
  }

  getUserWarningList() {
    this.commonService.getUserWarnings().subscribe(response => {
      if(response.HasError){
        console.log(response.Messages);
      }else{
        this.announcements = response.Data;
      }
    },
      error => {
        let errorResponse = error;
        console.log(errorResponse.error.Message);
    });
  }

  async ShowPopUpModal() {
    const myModal = await this.modalController.create({
      component: NotificationDetails,
      componentProps: { 
        Title: "Notification",
        Message: "Notification Body",
        Time: "02-Jul-19 02:30:33 PM"
      },
      cssClass: 'popup-modal-css',
      backdropDismiss:false,
    });
    return await myModal.present();
  }



}
