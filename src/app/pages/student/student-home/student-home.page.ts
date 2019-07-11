import { CommonService } from './../../../services/common/common.service';
import { StudentClassScheduleService } from './../../../services/student/student-class-schedule.service';
import { AlertService } from './../../../core/alert/alert.service';
import { PushNotificationService } from './../../../core/oneSignal/push-notification.service';
import { LoadingService } from './../../../core/loader/loading.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { StudentProfileService } from '../../../services/student/student-profile.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {

  
  panelOpenState = false;
  public isCollapsed = false;
  activeId = ['static-1', 'static-2'];

  // dashboard: Dashboard;
  a: any;
  RegistrationHideFlag = true;
  ScheduleHideFlag = true;s

  //ProgressBar
  color = 'warn';
  mode = 'indeterminate';
  value = 50;

  public schedule: any;
  playerID: any;
  semesterList: any;
  semesterData: any;

  nrSelect: any;
  invalidUserMessage: any;

  private userImage: string = null;
  private appUserInfo: any;
  private notificationCount: number;
  private classSchedules: any;


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    // private homeApiService: HomeApiService,
    private commonService: CommonService,
    private loadingService: LoadingService,
    private datePipe: DatePipe,
    private pushNotification: PushNotificationService,
    private alertService: AlertService,
    private studentProfileService: StudentProfileService,
    private studentClassSceduleService: StudentClassScheduleService) {
  }

  ngOnInit() {
    this.pushNotification.oneSignalSubscription();
    this.pushNotification.getPlayerID();
    this.getSemesterList();
    // this.getSchedule();
    this.getClassSchedule();
    this.getCurrentUserInfo();
    this.getUserProfileImage();
  }

  private currentDateTime = new Date();
  private fromDateTime = this.datePipe.transform(this.currentDateTime, 'yyyy-MM-dd HH:mm:ss.SSS');
  private tillDateTime = this.datePipe.transform(this.currentDateTime.setDate(this.currentDateTime.getDate() + 4), 'yyyy-MM-dd HH:mm:ss.SSS');

  // getSchedule() {
  //   this.loadingService.loadingStart();
  //   this.homeApiService.schedule(this.fromDateTime, this.tillDateTime).subscribe(res => {
  //     this.loadingService.loadingDismiss();
  //     this.schedule = res.Data;
  //     this.schedule.forEach(element => {
  //       if (element.Classes.length === 0) {
  //         element.Classes.push({ ID: 0, SectionID: 0, SectionDescription: "No class on this day", Room: "", Time: "" });
  //       }
  //     });
  //   },
  //     err => {
  //       this.loadingService.loadingDismiss();
  //       this.alertService.alertError("Something went wrong");
  //     });
  // }

  getSemesterList(){
    this.commonService.semesterList().subscribe(semesterLists => {
      this.semesterList = semesterLists.Data;
      this.commonService.currentSemester().subscribe(currentSemester => {
        let currentSemesterId = currentSemester.Data.ID;
        let isCurrentSemesterEnrolled = false;
        this.semesterList.forEach(semester => {
          if(semester.ID === currentSemesterId){
            isCurrentSemesterEnrolled = true;
          }
        });

        if(isCurrentSemesterEnrolled){
          this.nrSelect = currentSemesterId;
        }else {
          this.nrSelect = this.semesterList[0].ID;
        }
      })
    });
  }

  onChangeSemester(){
    this.commonService.registeredCoursesBySemester(this.nrSelect).subscribe(res => {
      this.semesterData = res.Data;
    });
  }

  getUserProfileImage() {
    this.studentProfileService.getImage().subscribe(response => {
      this.userImage = response;
    })
  }

  getCurrentUserInfo() {
    this.commonService.currentUserInfo().subscribe(res => {
      let result = res;
      if(result.HasError){
        console.log(result.Messages);
      }else{
        this.appUserInfo = result.Data;
        console.log(this.appUserInfo);
        this.notificationCount = this.appUserInfo.UnReadNotificationCount;
      }
    })
  }

  getClassSchedule() {
    let fromDateTime = this.datePipe.transform(this.currentDateTime,'yyyy-MM-dd HH:mm:ss.SSS');
    let toDateTime = this.datePipe.transform(this.currentDateTime.setDate(this.currentDateTime.getDate()+1),'yyyy-MM-dd HH:mm:ss.SSS');

    this.loadingService.loadingStart();

    this.studentClassSceduleService.getStudentClassSchedule(fromDateTime, toDateTime).subscribe(response => {
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
